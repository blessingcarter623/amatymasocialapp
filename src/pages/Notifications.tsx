
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  MessageCircle, 
  Users, 
  Heart, 
  UserPlus,
  Settings,
  MoreVertical
} from "lucide-react";
import { useState } from "react";

const notifications = [
  {
    id: "1",
    type: "message",
    title: "New message from Ofenste Tabane SG",
    description: "The Department proposal looks promising...",
    timestamp: "5 min ago",
    isRead: false,
    avatar: null,
    icon: MessageCircle
  },
  {
    id: "2",
    type: "group",
    title: "TTMBAH Leadership",
    description: "You were added to the group",
    timestamp: "1 hour ago",
    isRead: false,
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    icon: Users
  },
  {
    id: "3",
    type: "like",
    title: "Your business listing received 5 new likes",
    description: "People are interested in your services",
    timestamp: "2 hours ago",
    isRead: true,
    avatar: null,
    icon: Heart
  },
  {
    id: "4",
    type: "follow",
    title: "John Doe started following you",
    description: "Check out their business profile",
    timestamp: "3 hours ago",
    isRead: true,
    avatar: null,
    icon: UserPlus
  },
  {
    id: "5",
    type: "group",
    title: "Amatyma Personal Group Chat",
    description: "3 new messages in the group",
    timestamp: "1 day ago",
    isRead: true,
    avatar: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    icon: MessageCircle
  }
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
              >
                Mark all read
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {notificationList.map((notification) => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                !notification.isRead ? 'border-amatyma-red/20 bg-amatyma-red/5' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    {notification.avatar ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>
                          <notification.icon className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-amatyma-red/10 flex items-center justify-center">
                        <notification.icon className="h-6 w-6 text-amatyma-red" />
                      </div>
                    )}
                    {!notification.isRead && (
                      <div className="absolute top-0 right-0 h-3 w-3 bg-amatyma-red rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className={`font-medium text-sm ${
                        !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {!notification.isRead && (
                        <Badge className="bg-amatyma-red text-white text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notificationList.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;
