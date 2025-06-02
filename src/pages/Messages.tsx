
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  Video, 
  Phone, 
  MoreVertical,
  Users,
  Plus
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    name: "Business Network Group",
    type: "group",
    lastMessage: "Let's schedule the next meeting",
    timestamp: "2 min ago",
    unreadCount: 3,
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    participants: 12
  },
  {
    id: "2",
    name: "John Doe",
    type: "individual",
    lastMessage: "Thanks for the business referral!",
    timestamp: "1 hour ago",
    unreadCount: 1,
    avatar: null,
    isOnline: true
  },
  {
    id: "3",
    name: "Marketing Team",
    type: "group",
    lastMessage: "New merchandise designs are ready",
    timestamp: "3 hours ago",
    unreadCount: 0,
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    participants: 8
  },
  {
    id: "4",
    name: "Sarah Wilson",
    type: "individual",
    lastMessage: "Great meeting today!",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: null,
    isOnline: false
  }
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/video-calls')}
            >
              <Video className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/create-group')}
            >
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Users className="h-4 w-4" />
            Create Group
          </Button>
          <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Video className="h-4 w-4" />
            Video Call
          </Button>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <Card 
              key={conversation.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/messages/${conversation.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar || undefined} />
                      <AvatarFallback>
                        {conversation.type === 'group' ? (
                          <Users className="h-6 w-6" />
                        ) : (
                          conversation.name.charAt(0).toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.type === 'individual' && conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">
                        {conversation.name}
                        {conversation.type === 'group' && (
                          <span className="text-sm text-muted-foreground ml-1">
                            ({conversation.participants})
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-amatyma-red text-white ml-2">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
