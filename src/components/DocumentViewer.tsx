
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { File } from 'lucide-react';

interface DocumentViewerProps {
  documentUrl: string | null;
  documentType: string | null;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentUrl, documentType }) => {
  if (!documentUrl) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center bg-gray-50 border-dashed">
        <div className="text-center p-8">
          <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">لا مستند محمّل</h3>
          <p className="text-sm text-gray-400 mt-1">
          قم بتحميل وثيقة المحكمة لعرضها هنا
          </p>
        </div>
      </Card>
    );
  }

  // Render different viewers based on document type
  const renderViewer = () => {
    if (documentType?.startsWith('image/')) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={documentUrl} 
            alt="Court Document" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    } else if (documentType === 'application/pdf') {
      return (
        <iframe 
          src={`${documentUrl}#view=FitH`} 
          className="w-full h-full"
          title="PDF Document"
        />
      );
    } else if (documentType === 'text/plain') {
      return (
        <ScrollArea className="w-full h-full p-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap">{documentUrl}</pre>
        </ScrollArea>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500">شكل المستند غير المدعوم</p>
        </div>
      );
    }
  };

  return (
    <Card className="w-full h-[500px] overflow-hidden document-viewer">
      {renderViewer()}
    </Card>
  );
};

export default DocumentViewer;
