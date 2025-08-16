import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Wallet, Users, DollarSign, Target } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "₹2,847.50",
      change: "+12.5%",
      icon: Wallet,
      trend: "up",
      color: "text-success"
    },
    {
      title: "Monthly Budget",
      value: "₹1,200.00",
      change: "₹347 left",
      icon: Target,
      trend: "neutral",
      color: "text-info"
    },
    {
      title: "Group Funds",
      value: "₹485.20",
      change: "3 active",
      icon: Users,
      trend: "up",
      color: "text-secondary"
    },
    {
      title: "This Month",
      value: "₹853.30",
      change: "-5.2%",
      icon: DollarSign,
      trend: "down",
      color: "text-warning"
    }
  ];

  const budgetCategories = [
    { name: "Food & Dining", spent: 280, budget: 400, color: "bg-accent" },
    { name: "Transportation", spent: 120, budget: 150, color: "bg-primary" },
    { name: "Entertainment", spent: 90, budget: 200, color: "bg-secondary" },
    { name: "Shopping", spent: 180, budget: 250, color: "bg-warning" },
    { name: "Bills", spent: 450, budget: 450, color: "bg-destructive" }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {Math.random() > 0.5 ? 'Abinesh' : 'Abhijeet'}! 👋</h1>
          <p className="text-primary-foreground/80 text-lg">
            You're doing great this month. Here's your financial overview.
          </p>
        </div>
        <div className="absolute right-4 top-4 opacity-20">
          <img src={heroImage} alt="Financial Dashboard" className="w-48 h-24 object-cover rounded-lg" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-muted/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 flex items-center ${stat.color}`}>
                    {stat.trend === "up" && <TrendingUp className="h-4 w-4 mr-1" />}
                    {stat.trend === "down" && <TrendingDown className="h-4 w-4 mr-1" />}
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color.replace('text-', 'from-')}/10 to-transparent`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Budget Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Budget Categories</h3>
        <div className="space-y-4">
          {budgetCategories.map((category, index) => {
            const percentage = (category.spent / category.budget) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                   <span className={`text-sm ${isOverBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
                     ₹{category.spent} / ₹{category.budget}
                   </span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-2 ${isOverBudget ? 'bg-destructive/20' : ''}`}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;