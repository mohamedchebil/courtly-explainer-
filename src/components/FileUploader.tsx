import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
  isIconMode?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, isLoading = false, isIconMode = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/tiff', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a PDF, image, or text document.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 10MB.');
      return;
    }
    
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:8000/doc', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        onFileUpload(data); // Pass the response data to the parent component
        toast.success('File uploaded and analyzed successfully');
      } catch (error) {
        toast.error('Failed to upload and analyze the file');
        console.error('Error:', error);
      } finally {
        if (isIconMode) setIsExpanded(false);
      }
    }
  };

  if (isIconMode && !isExpanded) {
    return (
      <Button 
        variant="outline" 
        size="icon"
        className="h-10 w-10 rounded-full bg-gray-200 border-gray-400 hover:bg-gray-300"
        onClick={() => {
          setIsExpanded(true);
          setTimeout(() => fileInputRef.current?.click(), 100);
        }}
      >
        <Upload className="h-5 w-5 text-white" />
      </Button>
    );
  }

  return (
    <Card className={isIconMode ? "absolute top-0 left-0 right-0 z-10 shadow-lg bg-neutral-900 border-neutral-800" : "bg-neutral-900 border-neutral-800"}>
      <CardHeader className="text-white">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="h-5 w-5 text-white" />
          تحميل وثيقة المحكمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
            isDragging ? "border-white bg-neutral-800" : "border-neutral-700 hover:border-neutral-600",
            selectedFile ? "bg-neutral-800" : ""
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            ref={fileInputRef}
            accept=".pdf,.jpg,.jpeg,.png,.tiff,.txt"
          />
          
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-neutral-800 p-4 rounded-full">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-400 mt-1">
                اسحب وأسقط ملفك هنا أو انقر لتصفح
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                أشكال الدعم: PDF, JPEG, PNG, TIFF, TXT (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <File className="h-8 w-8 text-white" />
                <div className="text-left">
                  <p className="font-medium truncate max-w-[200px] sm:max-w-[300px] text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                aria-label="Remove file"
                className="text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isIconMode && (
          <Button 
            variant="ghost"
            onClick={() => setIsExpanded(false)}
            className="text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            إلغاء
          </Button>
        )}
        <div className="ml-auto">
          <Button 
            onClick={uploadFile} 
            disabled={isLoading || !selectedFile}
            className="flex items-center gap-2 bg-white text-black hover:bg-neutral-300"
          >
            {isLoading ? "Processing..." : "Analyze Document"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileUploader;