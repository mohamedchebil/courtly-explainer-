
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleHelp, FileText, PieChart, Languages } from 'lucide-react';

interface KeyPoint {
  title: string;
  description: string;
  highlight?: boolean;
}

interface AIAnalysisProps {
  isLoading: boolean;
  simplifiedExplanation: string;
  keyPoints: KeyPoint[];
  arabicSummary: string;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({
  isLoading,
  simplifiedExplanation,
  keyPoints,
  arabicSummary
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleHelp className="h-5 w-5 text-primary" />
          تحليل وثائق بالذكاء الاصطناعي
        </CardTitle>
        <CardDescription>
        هذا التفسير المدعوم بالذكاء الاصطناعي يقسم المستند إلى لغة مفهومة
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="explanation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="explanation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">شرح</span>
            </TabsTrigger>
            <TabsTrigger value="key-points" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">النقاط الأساسية</span>
            </TabsTrigger>
            <TabsTrigger value="arabic" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">العربية</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explanation" className="mt-4">
            <ScrollArea className="h-[300px] w-full pr-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              ) : (
                <div className="text-sm leading-relaxed space-y-4">
                  {simplifiedExplanation.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="key-points" className="mt-4">
            <ScrollArea className="h-[300px] w-full pr-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {keyPoints.map((point, idx) => (
                    <div key={idx} className={`p-3 rounded-md ${point.highlight ? 'bg-legal-highlight/20 border border-legal-highlight/30' : 'bg-gray-50 border border-gray-100'}`}>
                      <h4 className="font-medium text-sm">{point.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{point.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="arabic" className="mt-4">
            <ScrollArea className="h-[300px] w-full pr-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <div className="text-right text-sm leading-relaxed space-y-4 font-arabicFont">
                  {arabicSummary.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} dir="rtl">{paragraph}</p>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIAnalysis;
