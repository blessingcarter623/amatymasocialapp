
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, Award, Calendar, Youtube, Instagram, Facebook, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { useTheme } from "@/context/ThemeContext";

const AboutOrganization = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">About Amatyma</h1>
        </div>

        {/* Hero Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={theme === "dark" 
                  ? "/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png"
                  : "/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png"
                } 
                alt="Amatyma Logo" 
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-amatyma-red">Amatyma Brotherhood Circle</h2>
                <p className="text-muted-foreground">Empowering men and communities</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-amatyma-red hover:bg-amatyma-red/90">Men's Wellness</Badge>
              <Badge className="bg-amatyma-red hover:bg-amatyma-red/90">Community Building</Badge>
              <Badge className="bg-amatyma-red hover:bg-amatyma-red/90">Fatherhood</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Values */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              Amatyma Brotherhood Circle is committed to empowering men and building stronger communities through mentorship, 
              dialogue, and social action. We focus on addressing issues including fatherhood, men's wellness, and community development.
            </p>
            
            <div className="grid gap-4">
              {[
                {
                  icon: <Users className="h-6 w-6 text-amatyma-red" />,
                  title: "Brotherhood",
                  description: "Creating a supportive network for men to connect and grow together."
                },
                {
                  icon: <Award className="h-6 w-6 text-amatyma-red" />,
                  title: "Empowerment",
                  description: "Providing resources for personal and professional development."
                },
                {
                  icon: <Calendar className="h-6 w-6 text-amatyma-red" />,
                  title: "Community Action",
                  description: "Organizing programs that address social challenges."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Programs */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Our Programs</h3>
            
            <Tabs defaultValue="shows" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="shows">Media Shows</TabsTrigger>
                <TabsTrigger value="outreach">Outreach</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shows" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-amatyma-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Like Tyma Like Ntwana</h4>
                      <p className="text-sm text-muted-foreground">A heart-warming show exploring father-son relationships</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-amatyma-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Amatyma On Parole</h4>
                      <p className="text-sm text-muted-foreground">Conversations with fathers who have served jail time</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="outreach" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-amatyma-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Amatyma Suit Drive</h4>
                      <p className="text-sm text-muted-foreground">Providing professional attire to young men for job interviews</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-amatyma-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Menstrual Drive</h4>
                      <p className="text-sm text-muted-foreground">Tackling period poverty and educating men about menstruation</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Connect With Us */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://www.instagram.com/amatyma_sa?igsh=eXhjeXplbms2dGoz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80"
              >
                <Instagram className="h-6 w-6 text-amatyma-red" />
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <p className="text-xs text-muted-foreground">30.5K followers</p>
                </div>
              </a>
              
              <a 
                href="https://www.youtube.com/@AMATYMA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80"
              >
                <Youtube className="h-6 w-6 text-amatyma-red" />
                <div>
                  <p className="font-medium text-sm">YouTube</p>
                  <p className="text-xs text-muted-foreground">2.94K subscribers</p>
                </div>
              </a>
              
              <a 
                href="https://www.facebook.com/share/1BZnjhQXFm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80"
              >
                <Facebook className="h-6 w-6 text-amatyma-red" />
                <div>
                  <p className="font-medium text-sm">Facebook</p>
                  <p className="text-xs text-muted-foreground">21K followers</p>
                </div>
              </a>
              
              <a 
                href="https://chat.whatsapp.com/E6RWhzKhGSnF7JvMphAs4O" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80"
              >
                <WhatsappIcon className="h-6 w-6 text-amatyma-red" />
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">796 members</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-amatyma-red" />
              <a href="mailto:Amatyma@ttmbha.com" className="text-amatyma-red">
                Amatyma@ttmbha.com
              </a>
            </div>
            
            <Button 
              className="w-full bg-amatyma-red hover:bg-amatyma-red/80"
              onClick={() => window.location.href = 'mailto:Amatyma@ttmbha.com'}
            >
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AboutOrganization;
