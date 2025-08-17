import { Trophy, Target, Users, TrendingUp, Star, Award, Crown, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GamificationSection = () => {
  const currentUser = {
    name: "You",
    points: 1250,
    streak: 15,
    rank: 3,
    avatar: "",
    level: "Gold Saver"
  };

  const leaderboard = [
    {
      id: 1,
      name: "Anuva Sharma",
      points: 1580,
      streak: 22,
      rank: 1,
      avatar: "",
      level: "Diamond Saver"
    },
    {
      id: 2,
      name: "Abhijeet Singh",
      points: 1420,
      streak: 18,
      rank: 2,
      avatar: "",
      level: "Platinum Saver"
    },
    {
      id: 3,
      name: "You",
      points: 1250,
      streak: 15,
      rank: 3,
      avatar: "",
      level: "Gold Saver"
    },
    {
      id: 4,
      name: "Akanksha Patel",
      points: 980,
      streak: 12,
      rank: 4,
      avatar: "",
      level: "Silver Saver"
    },
    {
      id: 5,
      name: "Abinesh Kumar",
      points: 850,
      streak: 8,
      rank: 5,
      avatar: "",
      level: "Bronze Saver"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Budget Master",
      description: "Stayed within budget for 30 days",
      icon: Target,
      completed: true,
      points: 100
    },
    {
      id: 2,
      title: "Saving Streak",
      description: "15 days saving streak",
      icon: TrendingUp,
      completed: true,
      points: 150
    },
    {
      id: 3,
      title: "Group Leader",
      description: "Created 5 successful group funds",
      icon: Users,
      completed: false,
      points: 200
    },
    {
      id: 4,
      title: "Investment Guru",
      description: "Made profitable investments for 3 months",
      icon: Trophy,
      completed: false,
      points: 300
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Diamond Saver": return "text-blue-600 bg-blue-50";
      case "Platinum Saver": return "text-purple-600 bg-purple-50";
      case "Gold Saver": return "text-yellow-600 bg-yellow-50";
      case "Silver Saver": return "text-gray-600 bg-gray-50";
      case "Bronze Saver": return "text-orange-600 bg-orange-50";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Star className="h-5 w-5 text-orange-500" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Gamification Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Compete with friends and earn rewards for smart financial habits
          </p>
        </div>
      </div>

      {/* Current User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              Your Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">#{currentUser.rank}</div>
            <Badge className={`mt-2 ${getLevelColor(currentUser.level)}`}>
              {currentUser.level}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.points.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +50 today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Saving Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.streak} days</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              5 days to next reward
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Next Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Platinum Saver</div>
            <Progress value={60} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              170 points to go
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Friends Leaderboard
            </CardTitle>
            <CardDescription>Top savers among your friends this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    user.name === "You" ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2 w-12">
                    {getRankIcon(user.rank)}
                    <span className="font-semibold">#{user.rank}</span>
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <Badge className={`text-xs ${getLevelColor(user.level)}`}>
                      {user.level}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">{user.points} pts</div>
                    <div className="text-xs text-muted-foreground">{user.streak} day streak</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>Unlock rewards for your financial milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-muted/30 border-muted"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.completed ? "bg-green-100" : "bg-muted"
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        achievement.completed ? "text-green-600" : "text-muted-foreground"
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant={achievement.completed ? "default" : "secondary"}>
                        +{achievement.points} pts
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamificationSection;