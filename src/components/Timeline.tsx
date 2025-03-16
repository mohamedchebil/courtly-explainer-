
import React from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="relative pl-6 pb-4">
          {/* Timeline line */}
          {index !== events.length - 1 && (
            <div className="absolute h-full w-px bg-gray-200 left-[9px] top-2"></div>
          )}
          
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 h-[18px] w-[18px] rounded-full bg-legal-primary flex items-center justify-center">
            <div className="h-[10px] w-[10px] rounded-full bg-white"></div>
          </div>
          
          {/* Content */}
          <div>
            <p className="text-xs font-medium text-gray-500">{event.date}</p>
            <h4 className="text-sm font-medium mt-1">{event.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
