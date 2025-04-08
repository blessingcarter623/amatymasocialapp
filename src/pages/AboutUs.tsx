
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Youtube, Instagram, Facebook, Mail, Calendar, Users, Award, Tv, Play, FileText } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const AboutUs = () => {
  const { theme } = useTheme();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About <span className="text-amatyma-red">Amatyma</span> Brotherhood Circle
            </h1>
            <p className="text-lg text-muted-foreground">
              A community-focused organization dedicated to empowering men and addressing critical social issues in South Africa.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge className="px-3 py-1 bg-amatyma-red hover:bg-amatyma-red/90">Men's Wellness</Badge>
              <Badge className="px-3 py-1 bg-amatyma-red hover:bg-amatyma-red/90">Community Building</Badge>
              <Badge className="px-3 py-1 bg-amatyma-red hover:bg-amatyma-red/90">Social Responsibility</Badge>
              <Badge className="px-3 py-1 bg-amatyma-red hover:bg-amatyma-red/90">Fatherhood</Badge>
            </div>
          </div>
          
          <div className="neumorphic p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img 
              src="/lovable-uploads/dea0e9d3-9890-4e10-902b-dca05d4a4945.png" 
              alt="Amatyma Brotherhood Circle Logo" 
              className="w-full rounded-xl transition-all duration-300 h-64 object-contain"
            />
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-12 bg-secondary rounded-xl p-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            Amatyma Brotherhood Circle is committed to empowering men and building stronger communities through mentorship, 
            dialogue, and social action. We focus on addressing issues including fatherhood, men's wellness, and community development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Users className="h-8 w-8 text-amatyma-red" />,
              title: "Brotherhood",
              description: "Creating a supportive network for men to connect, share experiences, and grow together."
            },
            {
              icon: <Award className="h-8 w-8 text-amatyma-red" />,
              title: "Empowerment",
              description: "Providing resources and opportunities for men to develop personally and professionally."
            },
            {
              icon: <Calendar className="h-8 w-8 text-amatyma-red" />,
              title: "Community Action",
              description: "Organizing outreach programs that address social challenges and support vulnerable communities."
            }
          ].map((item, index) => (
            <Card key={index} className="neumorphic overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
              <CardContent className="p-6 text-center">
                <div className="bg-background rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Our Programs and Initiatives */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6">Our Programs & Initiatives</h2>
        
        <Tabs defaultValue="media" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="media" className="text-sm md:text-base">Media & Shows</TabsTrigger>
            <TabsTrigger value="events" className="text-sm md:text-base">Events</TabsTrigger>
            <TabsTrigger value="outreach" className="text-sm md:text-base">Outreach Programs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="media" className="space-y-8">
            {/* Featured Show with New Image */}
            <Card className="overflow-hidden border-amatyma-red/20">
              <CardContent className="p-0">
                <img 
                  src="/lovable-uploads/a4ab9402-736a-4564-9718-34395efbe9fd.png" 
                  alt="Like Tyma Like Ntwana SABC 2 Show" 
                  className="w-full object-contain"
                />
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <img 
                    src="/lovable-uploads/87e905d5-18bf-4ca6-a54d-567f319c9289.png" 
                    alt="Like Tyma Like Ntwana" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Tv className="h-5 w-5 text-amatyma-red" />
                        <span className="text-sm font-medium text-amatyma-red">TV Show</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">Like Tyma Like Ntwana</h3>
                      <p className="text-sm text-gray-300">A heart-warming show exploring relationships between fathers and sons</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <img 
                    src="/lovable-uploads/85dd6915-b0d8-4f67-8645-4d0b5ebd0323.png" 
                    alt="Amatyma On Parole" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="h-5 w-5 text-amatyma-red" />
                        <span className="text-sm font-medium text-amatyma-red">YouTube Series</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">Amatyma On Parole</h3>
                      <p className="text-sm text-gray-300">Conversations with fathers who have served jail time</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white">
                <Youtube className="mr-2 h-4 w-4" />
                Follow Our Channel
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="neumorphic overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/lovable-uploads/d57214ea-790c-45a1-b3ec-224ceeff4d49.png" 
                    alt="Amatyma Events" 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Regular Events</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 bg-amatyma-red rounded-full flex-shrink-0 mt-1"></span>
                        <span>State of Fatherhood Address (before Father's Day)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 bg-amatyma-red rounded-full flex-shrink-0 mt-1"></span>
                        <span>Amatyma Heritage Summit (Heritage Day)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 bg-amatyma-red rounded-full flex-shrink-0 mt-1"></span>
                        <span>International Men's Day Celebration (Nov 19)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="neumorphic overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/lovable-uploads/2dc6006e-bb4c-49ca-97d9-c94ec823eac1.png" 
                    alt="Amatyma Events Collage" 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Special Events</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 bg-amatyma-red rounded-full flex-shrink-0 mt-1"></span>
                        <span>Father & Son Brunch (December)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 bg-amatyma-red rounded-full flex-shrink-0 mt-1"></span>
                        <span>Love Picnic (February)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 bg-amatyma-red rounded-full flex-shrink-0 mt-1"></span>
                        <span>End Period Poverty Golf Day (March)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="outreach" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="neumorphic">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amatyma-red/10 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-amatyma-red" />
                    </div>
                    <h3 className="text-xl font-bold">Amatyma Suit Drive</h3>
                  </div>
                  <p className="mb-4">
                    Our suit drive collects gently used suits to donate to underprivileged grade 12 boys & university final year male students, helping them prepare for job interviews and special occasions.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Provide young men with professional attire</li>
                    <li>- Boost their confidence and self-esteem</li>
                    <li>- Empower them to pursue their goals and dreams</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="neumorphic">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amatyma-red/10 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-amatyma-red" />
                    </div>
                    <h3 className="text-xl font-bold">Amatyma Menstrual Drive</h3>
                  </div>
                  <p className="mb-4">
                    Our menstrual drive tackles period poverty and educates men about menstruation through various events, including golf days. We collect essential items for underprivileged school girls.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Reusable sanitary packs</li>
                    <li>- Sanitary wear</li>
                    <li>- Sanitary pads</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Endorsements Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Our Endorsements</h2>
        
        <Carousel className="w-full">
          <CarouselContent>
            {[
              {
                image: "/lovable-uploads/1cf1915d-4618-4adc-ae17-124d92eb7b16.png",
                org: "Proudly South African",
                quote: "The AMATYMA initiative resonates with Proudly South African as it works to assist men understand the issues that come with financial vulnerability, amongst many other things."
              },
              {
                image: "/lovable-uploads/d9434135-8f20-4688-ad1d-99fc3dcef6af.png",
                org: "Brand South Africa",
                quote: "Brand South Africa hereby wishes to convey its support and endorsement of the AMATYMA initiative which has the potential to make an immensely positive impact on South African citizens."
              },
              {
                image: "/lovable-uploads/5fc60434-b45d-4e00-b298-93bd2e92bf30.png",
                org: "Department of Basic Education",
                quote: "As a prominent personality who has achieved remarkable success and serves as an inspiration to many young South Africans, your presence would add immense value to this important occasion."
              }
            ].map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="neumorphic h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex-shrink-0 h-16 flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.org} 
                        className="h-full object-contain"
                      />
                    </div>
                    <Separator className="mb-4" />
                    <p className="text-sm italic flex-grow mb-4">{item.quote}</p>
                    <p className="text-right text-sm font-semibold text-amatyma-red">{item.org}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </section>
      
      {/* Digital Presence */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Connect With Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow Amatyma Brotherhood Circle on social media to stay updated with our latest events, initiatives, and media content.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="neumorphic p-6 text-center hover:scale-105 transition-transform">
            <Instagram className="h-8 w-8 mx-auto mb-3 text-amatyma-red" />
            <p className="font-medium">@amatyma_sa</p>
            <p className="text-sm text-muted-foreground">30.5K followers</p>
          </a>
          
          <a href="#" className="neumorphic p-6 text-center hover:scale-105 transition-transform">
            <Youtube className="h-8 w-8 mx-auto mb-3 text-amatyma-red" />
            <p className="font-medium">Amatyma Brotherhood</p>
            <p className="text-sm text-muted-foreground">2.94K subscribers</p>
          </a>
          
          <a href="#" className="neumorphic p-6 text-center hover:scale-105 transition-transform">
            <Facebook className="h-8 w-8 mx-auto mb-3 text-amatyma-red" />
            <p className="font-medium">Amatyma</p>
            <p className="text-sm text-muted-foreground">21K followers</p>
          </a>
          
          <a href="#" className="neumorphic p-6 text-center hover:scale-105 transition-transform">
            <WhatsappIcon className="h-8 w-8 mx-auto mb-3 text-amatyma-red" />
            <p className="font-medium">WhatsApp Group</p>
            <p className="text-sm text-muted-foreground">796 members</p>
          </a>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-12">
        <Card className="neumorphic overflow-hidden">
          <div className="grid md:grid-cols-2">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">Get In Touch</h2>
              <p className="text-muted-foreground">
                Have questions about our programs or want to get involved? Reach out to us directly through email.
              </p>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amatyma-red" />
                <a href="mailto:Amatyma@ttmbha.com" className="text-amatyma-red hover:underline">
                  Amatyma@ttmbha.com
                </a>
              </div>
              
              <Button className="bg-amatyma-red hover:bg-amatyma-red/80 mt-4">
                Contact Us
              </Button>
            </CardContent>
            
            <div className="relative min-h-[300px]">
              <img 
                src="/lovable-uploads/99e6da3f-557f-4c6a-80f1-e21df9bcdd69.png" 
                alt="Amatyma Contact" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/dea0e9d3-9890-4e10-902b-dca05d4a4945.png" 
                  alt="Amatyma Logo" 
                  className="h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </Card>
      </section>
      
      {/* Final CTA */}
      <section className="py-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-amatyma-red">Asbonge!</span> Danko!
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Thank you for your interest in Amatyma Brotherhood Circle. Together, we can make a positive impact in our communities.
        </p>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
