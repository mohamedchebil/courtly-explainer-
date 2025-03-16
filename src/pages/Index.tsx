
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import DocumentViewer from '@/components/DocumentViewer';
import AIAnalysis from '@/components/AIAnalysis';
import KeyInfoVisualization from '@/components/KeyInfoVisualization';
import MessageInput from '@/components/MessageInput';
import { processDocument, DocumentAnalysis, analyzeMessage } from '@/services/documentService';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [inputMode, setInputMode] = useState<'initial' | 'expanded'>('initial');
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setInputMode('expanded');
    
    // Create a URL for the document to display
    const fileUrl = URL.createObjectURL(file);
    setDocumentUrl(fileUrl);
    setDocumentType(file.type);
    
    try {
      // Process the document (in a real app, this would send to an API)
      const result = await processDocument(file);
      setAnalysis(result);
    } catch (error) {
      console.error("Error processing document:", error);
      toast({
        title: "Error",
        description: "Failed to process the document. Please try another file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageSubmit = async (message: string) => {
    setIsMessageLoading(true);
    setInputMode('expanded');
    try {
      // Analyze the message using our service
      const result = await analyzeMessage(message);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "Your message has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Error analyzing message:", error);
      toast({
        title: "Error",
        description: "Failed to analyze your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMessageLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
          شرح وثيقة المحكمة
          </h1>
          <p className="text-center text-neutral-400 mb-8 max-w-2xl mx-auto">
          قم بتحميل مستند المحكمة الخاص بك أو أرسل رسالة للحصول على تفسير مدعوم بالذكاء الاصطناعي بلغة بسيطة،
          تصور المعلومات الرئيسية، والترجمة العربية.
          </p>
          
          {inputMode === 'initial' ? (
            <div className="bg-gray-100 rounded-xl p-4 flex items-center mb-12">
              <div className="flex-1 flex">
              <Textarea 
                className="bg-white border border-gray-300 rounded-xl text-black placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="أطرح علينا سؤالك"
                onClick={() => document.querySelector<HTMLButtonElement>('[data-message-button]')?.click()}
              />


              </div>
              <div className="flex gap-3 ml-2">
              <Button 
              data-message-button
              type="button" 
              variant="outline" 
              size="icon"
              className="h-10 w-10 rounded-full bg-gray-200 border-gray-400 hover:bg-gray-300"
              onClick={() => setIsExpanded(true)}
            >
              <Send className="h-5 w-5 text-gray-700" />
            </Button>

            <FileUploader 
              onFileUpload={handleFileUpload} 
              isLoading={isLoading} 
              isIconMode={true} 
            />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {documentUrl && (
                  <Card className="bg-neutral-900 border-neutral-800">
                    <CardContent className="p-4">
                      <h2 className="text-lg font-semibold mb-3 text-white">معاينة المستند</h2>
                      <DocumentViewer documentUrl={documentUrl} documentType={documentType} />
                    </CardContent>
                  </Card>
                )}
                
                <div>
                  <AIAnalysis
                    isLoading={isLoading || isMessageLoading}
                    simplifiedExplanation={analysis?.simplifiedExplanation || ""}
                    keyPoints={analysis?.keyPoints || []}
                    arabicSummary={analysis?.arabicSummary || ""}
                  />
                </div>
              </div>
              
              {analysis && (
                <div>
                  <KeyInfoVisualization
                    isLoading={isLoading || isMessageLoading}
                    documentType={analysis?.documentType || ""}
                    caseTimeline={analysis?.caseTimeline || []}
                    parties={analysis?.parties || []}
                    documentMetrics={analysis?.documentMetrics || {
                      totalPages: 0,
                      filePages: 0,
                      exhibits: 0,
                      citations: 0,
                      dates: 0
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t border-neutral-800 mt-12">
        <div className="container mx-auto p-4 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} CourtlyExplainer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
