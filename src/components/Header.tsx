
import React from 'react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <a href="#home" className="text-xl font-bold text-primary">Portfolio</a>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
          <a href="#projects" className="text-foreground hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="text-foreground">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
