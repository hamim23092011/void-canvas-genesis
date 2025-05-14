
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const About: React.FC = () => {
  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "UI/UX Design", level: 85 },
    { name: "CSS/Tailwind", level: 90 },
    { name: "Database Design", level: 75 },
  ];

  return (
    <section id="about" className="bg-secondary/50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold mb-4">My Story</h3>
            <p className="mb-4 text-lg">
              With over 5 years of experience in web development, I specialize in creating 
              responsive, user-friendly applications that solve real-world problems.
            </p>
            <p className="mb-4 text-lg">
              I started my journey as a self-taught developer and gradually expanded my skill set 
              through continuous learning and hands-on projects. My background in both design and 
              development allows me to bridge the gap between aesthetics and functionality.
            </p>
            <p className="text-lg">
              When I'm not coding, you can find me hiking in the mountains, reading science 
              fiction, or experimenting with new technologies to stay ahead of the curve.
            </p>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { title: "Front-End Development", description: "Creating responsive UIs with modern frameworks and libraries" },
            { title: "Back-End Systems", description: "Building robust APIs and server-side applications" },
            { title: "UI/UX Design", description: "Designing intuitive interfaces focused on user experience" }
          ].map((item, index) => (
            <Card key={index} className="animate-slide-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
