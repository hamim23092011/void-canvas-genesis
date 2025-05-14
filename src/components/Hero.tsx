
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-primary">Alex Johnson</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-muted-foreground">
              Full-Stack Developer & UI/UX Designer
            </h2>
            <p className="text-lg mb-8 max-w-lg">
              I create beautiful, functional websites and applications with a focus on user experience and performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                View My Work
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Get In Touch
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block animate-slide-in-right">
            <div className="aspect-square bg-accent/10 rounded-full relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full"></div>
              <div className="absolute inset-8 bg-background rounded-full flex items-center justify-center">
                <div className="text-7xl font-bold">AJ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Hero;
