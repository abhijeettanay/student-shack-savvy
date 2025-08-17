import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, TrendingUp, Clock, CheckCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LoansSection = () => {
  const [activeTab, setActiveTab] = useState("borrowed");
  
  const borrowedLoans = [
    {
      id: 1,
      lender: "Anuva ",
      amount: 150.00,
      interestRate: 2.5,
      dueDate: "Jan 15, 2025",
      purpose: "Textbooks",
      status: "active",
      amountPaid: 50.00
    },
    {
      id: 2,
      lender: "Abhijeet Sum Ting Wong",
      amount: 80.00,
      interestRate: 3.0,
      dueDate: "Dec 20, 2024",
      purpose: "Emergency repair",
      status: "overdue",
      amountPaid: 0.00
    }
  ];

  const lentLoans = [
    {
      id: 3,
      borrower: "Akanksha ",
      amount: 200.00,
      interestRate: 2.0,
      dueDate: "Jan 30, 2025",
      purpose: "Laptop repair",
      status: "active",
      amountPaid: 100.00
    },
    {
      id: 4,
      borrower: "Abinesh Ching Chong Wu",
      amount: 120.00,
      interestRate: 2.5,
      dueDate: "Dec 25, 2024",
      purpose: "Course materials",
      status: "completed",
      amountPaid: 123.00
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-info/10 text-info";
      case "completed": return "bg-success/10 text-success";
      case "overdue": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return Clock;
      case "completed": return CheckCircle;
      case "overdue": return TrendingUp;
      default: return Clock;
    }
  };

  const totalBorrowed = borrowedLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalLent = lentLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalInterestEarned = lentLoans.reduce((sum, loan) => {
    const interest = loan.amount * (loan.interestRate / 100);
    return sum + (loan.status === "completed" ? interest : 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <CreditCard className="h-6 w-6 mr-2 text-primary" />
          Peer Loans
        </h2>
        <Button className="bg-gradient-to-r from-accent to-accent/80">
          <Plus className="h-4 w-4 mr-2" />
          New Loan
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-destructive/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Borrowed</p>
            <p className="text-2xl font-bold text-destructive">₹{totalBorrowed.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">2 active loans</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-success/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Lent</p>
            <p className="text-2xl font-bold text-success">₹{totalLent.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">2 loans given</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-accent/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Interest Earned</p>
            <p className="text-2xl font-bold text-accent">₹{totalInterestEarned.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">From completed loans</p>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("borrowed")}
          className={`flex-1 py-2 px-4 rounded-md transition-all ${
            activeTab === "borrowed" 
              ? "bg-card shadow-sm font-medium" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Money I Borrowed
        </button>
        <button
          onClick={() => setActiveTab("lent")}
          className={`flex-1 py-2 px-4 rounded-md transition-all ${
            activeTab === "lent" 
              ? "bg-card shadow-sm font-medium" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Money I Lent
        </button>
      </div>

      {/* Loan Lists */}
      <div className="space-y-4">
        {activeTab === "borrowed" ? (
          <>
            <h3 className="text-lg font-semibold">Loans You Borrowed</h3>
            {borrowedLoans.map((loan) => {
              const StatusIcon = getStatusIcon(loan.status);
              const remaining = loan.amount - loan.amountPaid;
              const progress = (loan.amountPaid / loan.amount) * 100;
              
              return (
                <Card key={loan.id} className="p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary/10">
                          {loan.lender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{loan.lender}</h4>
                        <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(loan.status)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {loan.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                       <p className="font-semibold">₹{loan.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Interest Rate</p>
                      <p className="font-semibold">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-semibold">{loan.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="font-semibold text-destructive">₹{remaining.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {loan.status !== "completed" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Paid: ₹{loan.amountPaid.toFixed(2)}</span>
                        <span>{progress.toFixed(1)}% complete</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-success to-success/80 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Make Payment
                        </Button>
                        <Button size="sm" variant="outline">
                          Message {loan.lender.split(' ')[0]}
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">Loans You Made</h3>
            {lentLoans.map((loan) => {
              const StatusIcon = getStatusIcon(loan.status);
              const remaining = loan.amount - loan.amountPaid;
              const progress = (loan.amountPaid / loan.amount) * 100;
              
              return (
                <Card key={loan.id} className="p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-success/10">
                          {loan.borrower.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{loan.borrower}</h4>
                        <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(loan.status)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {loan.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-semibold">₹{loan.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Interest Rate</p>
                      <p className="font-semibold">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-semibold">{loan.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected Return</p>
                       <p className="font-semibold text-success">
                         ₹{(loan.amount * (1 + loan.interestRate / 100)).toFixed(2)}
                       </p>
                    </div>
                  </div>
                  
                  {loan.status !== "completed" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Received: ₹{loan.amountPaid.toFixed(2)}</span>
                        <span>{progress.toFixed(1)}% repaid</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-info to-info/80 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                        <Button size="sm" variant="outline">
                          Message {loan.borrower.split(' ')[0]}
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </>
        )}
      </div>

      {/* Loan Safety Tips */}
      <Card className="p-6 bg-gradient-to-br from-muted/20 to-warning/5">
        <h3 className="font-semibold mb-4">Loan Safety Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium">For Borrowers:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Only borrow what you can realistically repay</li>
              <li>• Communicate early if you'll be late on payments</li>
              <li>• Keep records of all transactions</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">For Lenders:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Only lend to people you trust</li>
              <li>• Set clear terms and payment schedules</li>
              <li>• Don't lend money you can't afford to lose</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoansSection;
