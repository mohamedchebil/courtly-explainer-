import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
  isIconMode?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSubmit, isLoading, isIconMode = false }) => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/ok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      await onSubmit(data.answer); // Pass the answer to the parent component
      setMessage(''); // Clear input after successful submission
      if (isIconMode) setIsExpanded(false);
    } catch (error) {
      console.error("Error submitting message:", error);
      toast({
        title: "Error",
        description: "Failed to analyze your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isIconMode && !isExpanded) {
    return (
      <Button 
        variant="outline" 
        size="icon"
        className="h-10 w-10 rounded-full bg-transparent border-neutral-700 hover:bg-neutral-800"
        onClick={() => setIsExpanded(true)}
      >
        <MessageSquare className="h-5 w-5 text-white" />
      </Button>
    );
  }

  return (
    <Card className={isIconMode ? "absolute top-0 left-0 right-0 z-10 shadow-lg bg-neutral-900 border-neutral-800" : "bg-neutral-900 border-neutral-800"}>
      <CardHeader className="text-white">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="h-5 w-5 text-white" />
          رسالة لذكاء الاصطناعي
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Poser une question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-700"
            disabled={isLoading}
            autoFocus={isIconMode}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {isIconMode && (
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              إلغاء
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading || !message.trim()}
            className="flex items-center gap-2 bg-white text-black hover:bg-neutral-300"
          >
            <Send className="h-4 w-4" />
            {isLoading ? "Analyzing..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MessageInput;