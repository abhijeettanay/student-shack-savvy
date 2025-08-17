import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, Minus, CreditCard, Smartphone, Building, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const DigitalWalletSection = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(12580.50);
  const [loading, setLoading] = useState(false);
  
  const walletBalance = 2847.50;
  const monthlyLimit = 10000;
  const usedLimit = 3420;
  
  const walletTransactions = [
    {
      id: 1,
      type: "credit",
      description: "Added money via UPI",
      amount: 500.00,
      date: "Dec 12, 2024",
      status: "completed",
      balance: 2847.50
    },
    {
      id: 2,
      type: "debit",
      description: "Bill split payment to Anuva",
      amount: -150.00,
      date: "Dec 11, 2024",
      status: "completed",
      balance: 2347.50
    },
    {
      id: 3,
      type: "credit",
      description: "Cashback from investment",
      amount: 25.00,
      date: "Dec 10, 2024",
      status: "completed",
      balance: 2497.50
    },
    {
      id: 4,
      type: "debit",
      description: "Food delivery payment",
      amount: -285.00,
      date: "Dec 9, 2024",
      status: "completed",
      balance: 2472.50
    },
    {
      id: 5,
      type: "credit",
      description: "Loan repayment from Abhijeet",
      amount: 200.00,
      date: "Dec 8, 2024",
      status: "completed",
      balance: 2757.50
    }
  ];

  const addMoneyMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Instant transfer via UPI",
      fees: "Free",
      limit: "₹50,000/day"
    },
    {
      id: "card",
      name: "Debit Card",
      icon: CreditCard,
      description: "Add from bank account",
      fees: "₹2 per transaction",
      limit: "₹25,000/day"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "Direct bank transfer",
      fees: "₹5 per transaction",
      limit: "₹1,00,000/day"
    }
  ];

  const benefits = [
    "No minimum balance required",
    "Instant transfers to friends",
    "Cashback on transactions",
    "Bill payment reminders",
    "Spending analytics",
    "24/7 customer support"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Wallet className="h-6 w-6 mr-2 text-primary" />
          Digital Wallet
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {/* Wallet Balance Card */}
      <Card className="p-6 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-primary-foreground/80 text-sm">MoneyWise Wallet</p>
              <p className="text-3xl font-bold">
                {showBalance ? `₹${walletBalance.toFixed(2)}` : "₹•••••"}
              </p>
            </div>
            <div className="p-2 bg-white/10 rounded-full">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-primary-foreground/60">Monthly Limit</p>
              <p className="text-sm font-medium">₹{usedLimit.toLocaleString()} / ₹{monthlyLimit.toLocaleString()}</p>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Money
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Money to Wallet</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="upi" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="bank">Bank</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upi" className="space-y-4">
                      <div>
                        <Label htmlFor="upi-amount">Amount (₹)</Label>
                        <Input
                          id="upi-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={addAmount}
                          onChange={(e) => setAddAmount(e.target.value)}
                        />
                      </div>
                      <Button className="w-full" disabled={!addAmount}>
                        Add ₹{addAmount || '0'} via UPI
                      </Button>
                    </TabsContent>
                    <TabsContent value="card" className="space-y-4">
                      <div>
                        <Label htmlFor="card-amount">Amount (₹)</Label>
                        <Input
                          id="card-amount"
                          type="number"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <Button className="w-full">Add Money via Card</Button>
                    </TabsContent>
                    <TabsContent value="bank" className="space-y-4">
                      <div>
                        <Label htmlFor="bank-amount">Amount (₹)</Label>
                        <Input
                          id="bank-amount"
                          type="number"
                          placeholder="Enter amount"
                        />
                      </div>
                      <Button className="w-full">Connect Bank Account</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-white/20 text-white">
                    <Minus className="h-4 w-4 mr-1" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Money</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="withdraw-amount">Amount (₹)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        max={walletBalance}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum: ₹{walletBalance.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="bank-account">Bank Account</Label>
                      <Input
                        id="bank-account"
                        placeholder="Select linked account"
                        disabled
                        value="SBI - •••• 1234"
                      />
                    </div>
                    <Button className="w-full" disabled={!withdrawAmount}>
                      Withdraw ₹{withdrawAmount || '0'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-card to-success/5">
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-lg font-bold text-success">+₹1,250</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-card to-primary/5">
          <p className="text-sm text-muted-foreground">Transactions</p>
          <p className="text-lg font-bold text-primary">127</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-card to-secondary/5">
          <p className="text-sm text-muted-foreground">Cashback Earned</p>
          <p className="text-lg font-bold text-secondary">₹89</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-card to-accent/5">
          <p className="text-sm text-muted-foreground">Friends Connected</p>
          <p className="text-lg font-bold text-accent">12</p>
        </Card>
      </div>

      {/* Add Money Methods */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Add Money Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {addMoneyMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.id} className="p-4 hover:shadow-md transition-all duration-300">
                <div className="text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{method.name}</h4>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="text-success">{method.fees}</p>
                    <p className="text-muted-foreground">{method.limit}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {walletTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{transaction.description}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>{transaction.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "credit" ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.type === "credit" ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Balance: ₹{transaction.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Wallet Benefits */}
      <Card className="p-6 bg-gradient-to-br from-muted/20 to-accent/5">
        <h3 className="font-semibold mb-4">Wallet Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DigitalWalletSection;