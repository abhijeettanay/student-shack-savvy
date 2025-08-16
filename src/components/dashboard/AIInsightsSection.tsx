import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingDown, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AIInsightsSection = () => {
  const insights = [
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Overspending Alert",
      message: "You've spent 15% more on food this week compared to last week. Consider meal planning to reduce costs.",
      action: "View Budget",
      color: "text-warning"
    },
    {
      type: "success",
      icon: TrendingUp,
      title: "Great Progress!",
      message: "You're saving 20% more this month. Keep up the excellent financial discipline!",
      action: "See Savings",
      color: "text-success"
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Smart Tip",
      message: "Based on your patterns, switching to a student meal plan could save you $80/month.",
      action: "Learn More",
      color: "text-info"
    }
  ];

  const spendingPattern = [
    { category: "Weekdays", amount: 45, color: "bg-primary" },
    { category: "Weekends", amount: 78, color: "bg-secondary" },
    { category: "Late Night", amount: 23, color: "bg-accent" }
  ];

  const recommendations = [
    {
      title: "Reduce Coffee Purchases",
      description: "You spend $85/month on coffee. Making coffee at home could save $60.",
      potential: "$60/month",
      difficulty: "Easy"
    },
    {
      title: "Use Student Discounts",
      description: "Many restaurants offer 15-20% student discounts you haven't used.",
      potential: "$25/month",
      difficulty: "Easy"
    },
    {
      title: "Bulk Grocery Shopping",
      description: "Shopping weekly instead of daily could reduce impulse purchases.",
      potential: "$40/month",
      difficulty: "Medium"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Brain className="h-6 w-6 mr-2 text-primary" />
          AI Insights
        </h2>
        <Button variant="outline">
          <Target className="h-4 w-4 mr-2" />
          Set Goals
        </Button>
      </div>

      {/* Weekly Summary */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <h3 className="text-lg font-semibold mb-4">This Week's Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">$247</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">+5%</p>
            <p className="text-sm text-muted-foreground">vs Last Week</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">87%</p>
            <p className="text-sm text-muted-foreground">Budget Health</p>
          </div>
        </div>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Key Insights</h3>
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index} className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full bg-gradient-to-br ${insight.color.replace('text-', 'from-')}/10 to-transparent`}>
                    <Icon className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
                    <Button variant="link" className="p-0 h-auto mt-2">
                      {insight.action} →
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Spending Patterns */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Spending Patterns</h3>
          <Card className="p-4">
            <h4 className="font-medium mb-4">Average Daily Spending</h4>
            <div className="space-y-3">
              {spendingPattern.map((pattern, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{pattern.category}</span>
                    <span className="text-sm text-muted-foreground">${pattern.amount}</span>
                  </div>
                  <Progress 
                    value={(pattern.amount / 78) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-all duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{rec.title}</h4>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                    {rec.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-success">{rec.potential}</span>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInsightsSection;