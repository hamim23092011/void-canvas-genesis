
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with product catalog, shopping cart, and secure checkout process.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg"
    },
    {
      title: "Task Management App",
      description: "A productivity application with kanban boards, task assignment, and progress tracking features.",
      tags: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
      image: "/placeholder.svg"
    },
    {
      title: "Fitness Tracking Dashboard",
      description: "A health analytics platform with workout logging, nutrition tracking, and progress visualization.",
      tags: ["React", "Chart.js", "Express", "PostgreSQL"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="projects">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Here are some of my recent works. Each project presented unique challenges that helped me grow as a developer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden project-card animate-slide-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <div className="aspect-video relative bg-secondary">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-secondary px-3 py-1 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                  <Button size="sm">Live Demo</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in">
          <Button size="lg" variant="outline" className="rounded-full">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
