
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Video, 
  Phone, 
  MoreVertical, 
  Send, 
  Smile, 
  Paperclip,
  Mic,
  Users
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock messages data
const mockMessages = [
  {
    id: "1",
    senderId: "user1",
    senderName: "John Doe",
    message: "Hey! How's the new business going?",
    timestamp: "10:30 AM",
    isOwn: false
  },
  {
    id: "2",
    senderId: "current",
    senderName: "You",
    message: "It's going great! Thanks for asking. The community support has been amazing.",
    timestamp: "10:32 AM",
    isOwn: true
  },
  {
    id: "3",
    senderId: "user1",
    senderName: "John Doe",
    message: "That's fantastic! I'd love to collaborate on some projects.",
    timestamp: "10:35 AM",
    isOwn: false
  },
  {
    id: "4",
    senderId: "current",
    senderName: "You",
    message: "Absolutely! Let's set up a meeting this week.",
    timestamp: "10:36 AM",
    isOwn: true
  }
];

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  // Mock conversation data
  const conversation = {
    name: "John Doe",
    type: "individual",
    isOnline: true,
    avatar: null
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: "current",
      senderName: "You",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto h-[calc(100vh-200px)] flex flex-col">
        {/* Chat Header */}
        <Card className="rounded-b-none border-b-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/messages')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar || undefined} />
                  <AvatarFallback>
                    {conversation.type === 'group' ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      conversation.name.charAt(0).toUpperCase()
                    )}
                  </AvatarFallback>
                </Avatar>
                {conversation.type === 'individual' && conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{conversation.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {conversation.isOnline ? 'Active now' : 'Last seen recently'}
                </p>
              </div>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/video-call/${id}`)}
                >
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[80%]">
                {!message.isOwn && (
                  <p className="text-xs text-muted-foreground mb-1 ml-2">
                    {message.senderName}
                  </p>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.isOwn
                      ? 'bg-amatyma-red text-white'
                      : 'bg-background border'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <Card className="rounded-t-none border-t-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>

              {newMessage.trim() ? (
                <Button
                  onClick={handleSendMessage}
                  className="bg-amatyma-red hover:bg-amatyma-red/80"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChatRoom;
