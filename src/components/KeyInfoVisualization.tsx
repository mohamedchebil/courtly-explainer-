
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { Timeline } from '@/components/Timeline';
import { BarChart3 } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface PartyInfo {
  name: string;
  type: string;
  role: string;
}

interface DocumentMetrics {
  totalPages: number;
  filePages: number;
  exhibits: number;
  citations: number;
  dates: number;
}

interface KeyInfoVisualizationProps {
  isLoading: boolean;
  documentType: string;
  caseTimeline: TimelineEvent[];
  parties: PartyInfo[];
  documentMetrics: DocumentMetrics;
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const KeyInfoVisualization: React.FC<KeyInfoVisualizationProps> = ({
  isLoading,
  documentType,
  caseTimeline,
  parties,
  documentMetrics
}) => {
  // Convert document metrics to chart data
  const metricsData = [
    { name: 'Total Pages', value: documentMetrics.totalPages },
    { name: 'File Pages', value: documentMetrics.filePages },
    { name: 'Exhibits', value: documentMetrics.exhibits },
    { name: 'Citations', value: documentMetrics.citations },
    { name: 'Dates', value: documentMetrics.dates },
  ];

  // Create pie chart data for parties
  const partiesData = parties.reduce((acc: Record<string, number>, party) => {
    if (!acc[party.role]) {
      acc[party.role] = 0;
    }
    acc[party.role] += 1;
    return acc;
  }, {});

  const pieData = Object.entries(partiesData).map(([name, value]) => ({ name, value }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          تصور المعلومات الرئيسية
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-[120px] w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">مقاييس المستندات</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metricsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">الجدول الزمني للقضية</h3>
                <div className="h-[250px] overflow-y-auto pr-2">
                  <Timeline events={caseTimeline} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">توزيع الأطراف</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyInfoVisualization;
