import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Split, Plus, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SplitBillsSection = () => {
  const [bills] = useState([
    {
      id: 1,
      title: "Pizza Night",
      total: 45.60,
      paidBy: "Alex",
      participants: [
        { name: "Alex", amount: 15.20, paid: true },
        { name: "Mike", amount: 15.20, paid: false },
        { name: "Sarah", amount: 15.20, paid: true }
      ],
      date: "Dec 10, 2024",
      status: "partial"
    },
    {
      id: 2,
      title: "Uber to Concert",
      total: 28.50,
      paidBy: "Emma",
      participants: [
        { name: "Emma", amount: 9.50, paid: true },
        { name: "Alex", amount: 9.50, paid: true },
        { name: "Jake", amount: 9.50, paid: false }
      ],
      date: "Dec 8, 2024",
      status: "partial"
    },
    {
      id: 3,
      title: "Grocery Shopping",
      total: 67.80,
      paidBy: "Lisa",
      participants: [
        { name: "Lisa", amount: 22.60, paid: true },
        { name: "Tom", amount: 22.60, paid: true },
        { name: "Alex", amount: 22.60, paid: true }
      ],
      date: "Dec 5, 2024",
      status: "completed"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "partial": return "text-warning";
      case "pending": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const totalOwed = bills.reduce((sum, bill) => {
    const userAmount = bill.participants.find(p => p.name === "Alex" && !p.paid)?.amount || 0;
    return sum + userAmount;
  }, 0);

  const totalToReceive = bills.reduce((sum, bill) => {
    if (bill.paidBy === "Alex") {
      const unpaidAmount = bill.participants.filter(p => !p.paid && p.name !== "Alex").reduce((acc, p) => acc + p.amount, 0);
      return sum + unpaidAmount;
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Split className="h-6 w-6 mr-2 text-primary" />
          Split Bills
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Split New Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Split a New Bill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Bill description (e.g., Dinner at Joe's)" />
              <Input type="number" placeholder="Total amount" />
              <Input placeholder="Add participants (comma separated)" />
              <Button className="w-full">Create Split</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-destructive/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You Owe</p>
            <p className="text-2xl font-bold text-destructive">${totalOwed.toFixed(2)}</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-success/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You're Owed</p>
            <p className="text-2xl font-bold text-success">${totalToReceive.toFixed(2)}</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-info/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Net Balance</p>
            <p className={`text-2xl font-bold ${totalToReceive - totalOwed >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${Math.abs(totalToReceive - totalOwed).toFixed(2)}
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Bills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Bills</h3>
        {bills.map((bill) => (
          <Card key={bill.id} className="p-6 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{bill.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Paid by {bill.paidBy} • {bill.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${bill.total.toFixed(2)}</p>
                <p className={`text-sm font-medium ${getStatusColor(bill.status)}`}>
                  {bill.status === "completed" ? "Settled" : 
                   bill.status === "partial" ? "Partially Paid" : "Pending"}
                </p>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Split between:</p>
              {bill.participants.map((participant, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs bg-primary/10">
                        {participant.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{participant.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      ${participant.amount.toFixed(2)}
                    </span>
                    {participant.paid ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            {bill.status !== "completed" && (
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline">
                  Send Reminder
                </Button>
                <Button size="sm" variant="outline">
                  Mark as Paid
                </Button>
                <Button size="sm">
                  Settle Up
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-muted/20 to-primary/5">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col">
            <Split className="h-6 w-6 mb-2" />
            <span className="text-sm">Split Receipt</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col">
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-sm">Add Expense</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col">
            <Check className="h-6 w-6 mb-2" />
            <span className="text-sm">Settle All</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col">
            <Avatar className="h-6 w-6 mb-2" />
            <span className="text-sm">Add Friend</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SplitBillsSection;