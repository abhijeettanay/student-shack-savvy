import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const InvestmentsSection = () => {
  const portfolio = [
    {
      name: "Tech Stocks ETF",
      symbol: "VTI",
      value: 1250.00,
      invested: 1100.00,
      change: 13.6,
      color: "text-success"
    },
    {
      name: "Gold Fund",
      symbol: "GOLD",
      value: 320.00,
      invested: 350.00,
      change: -8.6,
      color: "text-destructive"
    },
    {
      name: "S&P 500 Index",
      symbol: "SPY",
      value: 890.50,
      invested: 800.00,
      change: 11.3,
      color: "text-success"
    }
  ];

  const recommendations = [
    {
      type: "Stock",
      name: "Apple Inc.",
      symbol: "AAPL",
      price: "$189.50",
      change: "+2.4%",
      risk: "Medium",
      description: "Technology leader with strong fundamentals"
    },
    {
      type: "ETF",
      name: "Student Bond Fund",
      symbol: "BND",
      price: "$78.20",
      change: "+0.8%",
      risk: "Low",
      description: "Conservative option for steady growth"
    },
    {
      type: "Crypto",
      name: "Bitcoin",
      symbol: "BTC",
      price: "$42,150",
      change: "+5.2%",
      risk: "High",
      description: "Digital currency with high volatility"
    }
  ];

  const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + item.invested, 0);
  const totalGainLoss = totalValue - totalInvested;
  const totalPercentage = ((totalValue - totalInvested) / totalInvested) * 100;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-success/10 text-success";
      case "Medium": return "bg-warning/10 text-warning";
      case "High": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-primary" />
          Investments
        </h2>
        <Button className="bg-gradient-to-r from-secondary to-secondary/80">
          <DollarSign className="h-4 w-4 mr-2" />
          Deposit Funds
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
          <div className="text-center">
            <PieChart className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-primary">${totalValue.toFixed(2)}</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-muted/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Invested</p>
            <p className="text-2xl font-bold">${totalInvested.toFixed(2)}</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-success/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Gain/Loss</p>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
            </p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-accent/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Return</p>
            <p className={`text-2xl font-bold ${totalPercentage >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalPercentage >= 0 ? '+' : ''}{totalPercentage.toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Portfolio Holdings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Portfolio</h3>
        <div className="space-y-4">
          {portfolio.map((holding, index) => {
            const gainLoss = holding.value - holding.invested;
            const percentage = ((holding.value - holding.invested) / holding.invested) * 100;
            
            return (
              <Card key={index} className="p-6 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{holding.name}</h4>
                      <span className="text-sm font-mono text-muted-foreground">{holding.symbol}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Invested: ${holding.invested.toFixed(2)}</span>
                      <span>•</span>
                      <span>Current: ${holding.value.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${gainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {gainLoss >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      <span className="font-semibold">
                        {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                      </span>
                    </div>
                    <p className={`text-sm ${gainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                      ({percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Investment Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recommended for Students</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-all duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {rec.type}
                    </span>
                    <h4 className="font-medium mt-2">{rec.name}</h4>
                    <p className="text-sm text-muted-foreground">{rec.symbol}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(rec.risk)}`}>
                    {rec.risk} Risk
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold">{rec.price}</span>
                  <span className="text-sm text-success">{rec.change}</span>
                </div>
                
                <p className="text-xs text-muted-foreground">{rec.description}</p>
                
                <Button size="sm" variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <Card className="p-6 bg-gradient-to-br from-muted/20 to-accent/5">
        <h3 className="font-semibold mb-4">Investment Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Getting Started</h4>
            <p className="text-sm text-muted-foreground">
              Learn the basics of investing as a college student with limited funds.
            </p>
            <Button variant="link" className="p-0 h-auto">
              Read Guide →
            </Button>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Risk Management</h4>
            <p className="text-sm text-muted-foreground">
              Understand how to balance risk and reward in your investment portfolio.
            </p>
            <Button variant="link" className="p-0 h-auto">
              Learn More →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvestmentsSection;