
import React from 'react';
import { Button } from "@/components/ui/button";
import { Gavel } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gavel className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">Better Call Agent !</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">About</Button>
          <Button size="sm">Contact</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
