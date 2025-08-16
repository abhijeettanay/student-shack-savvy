import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, Building, QrCode, ArrowUpRight, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PaymentGatewaySection = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  
  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using PhonePe, GPay, Paytm",
      fees: "Free",
      processingTime: "Instant"
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
      fees: "₹2 + 1.2%",
      processingTime: "Instant"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks supported",
      fees: "₹5",
      processingTime: "2-5 minutes"
    },
    {
      id: "qr",
      name: "QR Code",
      icon: QrCode,
      description: "Scan with any UPI app",
      fees: "Free",
      processingTime: "Instant"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "payment",
      description: "Paid to Akanksha Wilson",
      amount: -150.00,
      date: "Dec 12, 2024",
      status: "completed",
      method: "UPI"
    },
    {
      id: 2,
      type: "received",
      description: "Received from Anuva Kim",
      amount: 200.00,
      date: "Dec 11, 2024",
      status: "completed",
      method: "Card"
    },
    {
      id: 3,
      type: "payment",
      description: "College Fee Payment",
      amount: -2500.00,
      date: "Dec 10, 2024",
      status: "completed",
      method: "Net Banking"
    },
    {
      id: 4,
      type: "received",
      description: "Abhijeet Chen - Split Bill",
      amount: 75.00,
      date: "Dec 9, 2024",
      status: "pending",
      method: "UPI"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success";
      case "pending": return "bg-warning/10 text-warning";
      case "failed": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <CreditCard className="h-6 w-6 mr-2 text-primary" />
          Payment Gateway
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-hover">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="recipient">Pay To</Label>
                <Input
                  id="recipient"
                  placeholder="Enter UPI ID or phone number"
                />
              </div>
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" disabled={!paymentAmount || !selectedMethod}>
                Continue to Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.id} className="p-4 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{method.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Fees: {method.fees}</span>
                      <span className="text-muted-foreground">{method.processingTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{transaction.description}</h4>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{transaction.date}</span>
                    <span>•</span>
                    <span>{transaction.method}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Security Notice */}
      <Card className="p-6 bg-gradient-to-br from-muted/20 to-primary/5 border-primary/20">
        <h3 className="font-semibold mb-4 text-primary">Payment Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium">Your payments are secured by:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• 256-bit SSL encryption</li>
              <li>• RBI approved payment gateway</li>
              <li>• Two-factor authentication</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Safety tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Never share your UPI PIN</li>
              <li>• Verify recipient details</li>
              <li>• Check transaction limits</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentGatewaySection;