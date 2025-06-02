
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Users,
  Clock,
  Calendar,
  Plus
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for recent calls and scheduled meetings
const recentCalls = [
  {
    id: "1",
    name: "Business Network Meeting",
    type: "group",
    participants: 8,
    duration: "45 min",
    timestamp: "2 hours ago",
    status: "completed",
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png"
  },
  {
    id: "2",
    name: "John Doe",
    type: "individual",
    duration: "12 min",
    timestamp: "Yesterday",
    status: "missed",
    avatar: null
  },
  {
    id: "3",
    name: "Marketing Team",
    type: "group",
    participants: 5,
    duration: "30 min",
    timestamp: "2 days ago",
    status: "completed",
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png"
  }
];

const scheduledMeetings = [
  {
    id: "1",
    name: "Weekly Business Review",
    type: "group",
    participants: 12,
    time: "Today, 3:00 PM",
    duration: "1 hour",
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png"
  },
  {
    id: "2",
    name: "Client Consultation",
    type: "individual",
    time: "Tomorrow, 10:00 AM",
    duration: "30 min",
    avatar: null
  }
];

const VideoCalls = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'recent' | 'scheduled'>('recent');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'missed': return 'bg-red-500';
      case 'ongoing': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missed': return <PhoneOff className="h-3 w-3" />;
      default: return <Video className="h-3 w-3" />;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Video Calls</h1>
          <Button
            className="bg-amatyma-red hover:bg-amatyma-red/80"
            onClick={() => navigate('/start-call')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Call
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 mx-auto mb-2 text-amatyma-red" />
              <h3 className="font-medium">Start Video Call</h3>
              <p className="text-sm text-muted-foreground">Instant video meeting</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-amatyma-red" />
              <h3 className="font-medium">Schedule Call</h3>
              <p className="text-sm text-muted-foreground">Plan a meeting</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'recent' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'recent' ? 'bg-background shadow-sm' : ''}`}
            onClick={() => setActiveTab('recent')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </Button>
          <Button
            variant={activeTab === 'scheduled' ? 'default' : 'ghost'}
            className={`flex-1 ${activeTab === 'scheduled' ? 'bg-background shadow-sm' : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Scheduled
          </Button>
        </div>

        {/* Recent Calls */}
        {activeTab === 'recent' && (
          <div className="space-y-3">
            <h2 className="font-semibold">Recent Calls</h2>
            {recentCalls.map((call) => (
              <Card key={call.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={call.avatar || undefined} />
                        <AvatarFallback>
                          {call.type === 'group' ? (
                            <Users className="h-6 w-6" />
                          ) : (
                            call.name.charAt(0).toUpperCase()
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full ${getStatusColor(call.status)} flex items-center justify-center`}>
                        {getStatusIcon(call.status)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{call.name}</h3>
                        {call.type === 'group' && (
                          <Badge variant="secondary">
                            {call.participants} people
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{call.timestamp}</span>
                        <span>•</span>
                        <span>{call.duration}</span>
                      </div>
                    </div>

                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Scheduled Meetings */}
        {activeTab === 'scheduled' && (
          <div className="space-y-3">
            <h2 className="font-semibold">Upcoming Meetings</h2>
            {scheduledMeetings.map((meeting) => (
              <Card key={meeting.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={meeting.avatar || undefined} />
                      <AvatarFallback>
                        {meeting.type === 'group' ? (
                          <Users className="h-6 w-6" />
                        ) : (
                          meeting.name.charAt(0).toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{meeting.name}</h3>
                        {meeting.type === 'group' && (
                          <Badge variant="secondary">
                            {meeting.participants} people
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{meeting.time}</span>
                        <span>•</span>
                        <span>{meeting.duration}</span>
                      </div>
                    </div>

                    <Button 
                      className="bg-amatyma-red hover:bg-amatyma-red/80"
                      size="sm"
                    >
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default VideoCalls;
