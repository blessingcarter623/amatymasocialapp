
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

// Mock conversations data
const conversationsData = {
  "1": {
    name: "Ofenste Tabane SG",
    type: "individual",
    isOnline: true,
    avatar: null,
    messages: [
      {
        id: "1",
        senderId: "ofenste",
        senderName: "Ofenste Tabane SG",
        message: "Good morning TTMBAH team. I've reviewed the proposal for The Department of Men's Mental Health and Wellness.",
        timestamp: "9:15 AM",
        isOwn: false
      },
      {
        id: "2",
        senderId: "current",
        senderName: "TTMBAH",
        message: "Good morning Secretary-General. Thank you for taking the time to review our comprehensive proposal.",
        timestamp: "9:17 AM",
        isOwn: true
      },
      {
        id: "3",
        senderId: "ofenste",
        senderName: "Ofenste Tabane SG",
        message: "The framework is impressive. The statistics on men's mental health crisis are concerning and your proposed solutions are well-structured.",
        timestamp: "9:20 AM",
        isOwn: false
      },
      {
        id: "4",
        senderId: "current",
        senderName: "TTMBAH",
        message: "We believe formalizing this department under government oversight will provide the resources and reach needed to address this crisis effectively.",
        timestamp: "9:22 AM",
        isOwn: true
      },
      {
        id: "5",
        senderId: "ofenste",
        senderName: "Ofenste Tabane SG",
        message: "I agree. The integration with existing health departments while maintaining specialized focus is key. What's your timeline for implementation?",
        timestamp: "9:25 AM",
        isOwn: false
      },
      {
        id: "6",
        senderId: "current",
        senderName: "TTMBAH",
        message: "We're proposing a phased approach: 6 months for pilot programs, 12 months for full rollout. We have identified key personnel and infrastructure requirements.",
        timestamp: "9:28 AM",
        isOwn: true
      },
      {
        id: "7",
        senderId: "ofenste",
        senderName: "Ofenste Tabane SG",
        message: "Excellent. I'll need to present this to the Cabinet. Can we schedule a formal presentation for next week?",
        timestamp: "9:30 AM",
        isOwn: false
      },
      {
        id: "8",
        senderId: "current",
        senderName: "TTMBAH",
        message: "Absolutely. We'll prepare the full presentation with budget allocations and expected outcomes. Tuesday or Wednesday work best for us.",
        timestamp: "9:32 AM",
        isOwn: true
      },
      {
        id: "9",
        senderId: "ofenste",
        senderName: "Ofenste Tabane SG",
        message: "Let's go with Wednesday at 2 PM. This could be transformative for men's mental health in our country.",
        timestamp: "9:35 AM",
        isOwn: false
      },
      {
        id: "10",
        senderId: "current",
        senderName: "TTMBAH",
        message: "Wednesday at 2 PM confirmed. We're excited about this opportunity to make a real difference. Thank you for your support, Secretary-General.",
        timestamp: "9:37 AM",
        isOwn: true
      }
    ]
  },
  "2": {
    name: "TTMBAH Leadership",
    type: "group",
    isOnline: true,
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    messages: [
      {
        id: "1",
        senderId: "leader1",
        senderName: "Leadership Team",
        message: "The government partnership meeting is confirmed for Wednesday.",
        timestamp: "10:30 AM",
        isOwn: false
      }
    ]
  }
};

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");

  // Get conversation data or default
  const conversationData = conversationsData[id as keyof typeof conversationsData] || {
    name: "Unknown Contact",
    type: "individual",
    isOnline: false,
    avatar: null,
    messages: []
  };

  const [messages, setMessages] = useState(conversationData.messages);

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
      <div className="max-w-md mx-auto h-[100vh] flex flex-col">
        {/* Chat Header */}
        <Card className="rounded-none border-b border-t-0">
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
                  <AvatarImage src={conversationData.avatar || undefined} />
                  <AvatarFallback>
                    {conversationData.type === 'group' ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      conversationData.name.charAt(0).toUpperCase()
                    )}
                  </AvatarFallback>
                </Avatar>
                {conversationData.type === 'individual' && conversationData.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{conversationData.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {conversationData.isOnline ? 'Active now' : 'Last seen recently'}
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

        {/* Messages Area - Updated to fill remaining space */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20 min-h-0">
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
        <Card className="rounded-none border-t">
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
