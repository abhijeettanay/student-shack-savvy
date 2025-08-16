import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Plus, Calendar, Target } from "lucide-react";

const GroupFundsSection = () => {
  const [groups] = useState([
    {
      id: 1,
      name: "Sarah's Birthday Party",
      target: 500,
      raised: 320,
       members: [
         { name: "Abinesh", amount: 80, avatar: "/placeholder.svg" },
         { name: "Abhijeet", amount: 60, avatar: "/placeholder.svg" },
         { name: "Anuva", amount: 100, avatar: "/placeholder.svg" },
         { name: "Akanksha", amount: 80, avatar: "/placeholder.svg" }
       ],
      deadline: "Dec 15, 2024",
      creator: "You"
    },
    {
      id: 2,
      name: "Weekend Trip Fund",
      target: 800,
      raised: 600,
       members: [
         { name: "Abinesh", amount: 150, avatar: "/placeholder.svg" },
         { name: "Anuva", amount: 200, avatar: "/placeholder.svg" },
         { name: "Abhijeet", amount: 100, avatar: "/placeholder.svg" },
         { name: "Akanksha", amount: 150, avatar: "/placeholder.svg" }
       ],
      deadline: "Jan 20, 2025",
      creator: "Anuva"
    },
    {
      id: 3,
      name: "Study Group Snacks",
      target: 100,
      raised: 85,
       members: [
         { name: "Abinesh", amount: 25, avatar: "/placeholder.svg" },
         { name: "Abhijeet", amount: 30, avatar: "/placeholder.svg" },
         { name: "Akanksha", amount: 30, avatar: "/placeholder.svg" }
       ],
      deadline: "Dec 30, 2024",
      creator: "Abhijeet"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Group Funds</h2>
        <Button className="bg-gradient-to-r from-secondary to-secondary/80">
          <Plus className="h-4 w-4 mr-2" />
          Create Group Fund
        </Button>
      </div>

      {/* Active Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group) => {
          const percentage = (group.raised / group.target) * 100;
          const isComplete = percentage >= 100;
          
          return (
            <Card key={group.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">Created by {group.creator}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="font-bold text-primary">₹{group.target}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium">
                     ₹{group.raised} raised ({percentage.toFixed(1)}%)
                   </span>
                   <span className="text-sm text-muted-foreground">
                     ₹{group.target - group.raised} to go
                   </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-3"
                />
              </div>

              {/* Members */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {group.members.length} contributors
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {group.deadline}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {group.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs bg-primary/10">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name}</span>
                      </div>
                       <span className="text-sm font-medium text-success">
                         +₹{member.amount}
                       </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={isComplete}
                >
                  {isComplete ? "Goal Reached!" : "Contribute"}
                </Button>
                <Button variant="ghost" size="sm">
                  Share
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center bg-gradient-to-br from-card to-secondary/5">
          <Target className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <p className="text-sm text-muted-foreground">Total Contributed</p>
          <p className="text-2xl font-bold text-secondary">₹1,005</p>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-br from-card to-primary/5">
          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Active Groups</p>
          <p className="text-2xl font-bold text-primary">{groups.length}</p>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-br from-card to-accent/5">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-accent" />
          <p className="text-sm text-muted-foreground">Next Deadline</p>
          <p className="text-lg font-bold text-accent">Dec 15</p>
        </Card>
      </div>
    </div>
  );
};

export default GroupFundsSection;