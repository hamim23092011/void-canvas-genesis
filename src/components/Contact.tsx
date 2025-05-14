
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-secondary/50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Have a project in mind or want to collaborate? Feel free to reach out to me using the form below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="animate-slide-up">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Subject" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-1">Email</p>
                <a href="mailto:alex@example.com" className="text-primary hover:underline">alex@example.com</a>
              </div>
              <div>
                <p className="font-medium mb-1">Location</p>
                <p>San Francisco, California</p>
              </div>
              <div>
                <p className="font-medium mb-1">Follow Me</p>
                <div className="flex space-x-4 mt-2">
                  {["GitHub", "LinkedIn", "Twitter"].map((platform) => (
                    <Button key={platform} variant="outline" size="sm">
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <Card className="mt-8 bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">Let's Work Together</h4>
                <p className="mb-4">
                  I'm currently available for freelance work and open to new opportunities.
                </p>
                <Button variant="secondary">Download CV</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
