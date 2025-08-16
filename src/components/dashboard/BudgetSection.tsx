import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, PieChart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BudgetSection = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food & Dining", allocated: 400, spent: 280, color: "bg-accent" },
    { id: 2, category: "Transportation", allocated: 150, spent: 120, color: "bg-primary" },
    { id: 3, category: "Entertainment", allocated: 200, spent: 90, color: "bg-secondary" },
    { id: 4, category: "Shopping", allocated: 250, spent: 180, color: "bg-warning" },
    { id: 5, category: "Bills & Utilities", allocated: 450, spent: 450, color: "bg-destructive" }
  ]);

  const [newBudget, setNewBudget] = useState({ category: "", allocated: "" });

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  const addBudget = () => {
    if (newBudget.category && newBudget.allocated) {
      setBudgets([...budgets, {
        id: Date.now(),
        category: newBudget.category,
        allocated: Number(newBudget.allocated),
        spent: 0,
        color: "bg-info"
      }]);
      setNewBudget({ category: "", allocated: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Budget Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Groceries"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="amount">Monthly Budget</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={newBudget.allocated}
                  onChange={(e) => setNewBudget({...newBudget, allocated: e.target.value})}
                />
              </div>
              <Button onClick={addBudget} className="w-full">
                Create Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-success/5">
          <div className="text-center">
            <PieChart className="h-8 w-8 mx-auto mb-2 text-success" />
            <p className="text-sm text-muted-foreground">Total Allocated</p>
            <p className="text-2xl font-bold text-success">₹{totalAllocated}</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-warning/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold text-warning">₹{totalSpent}</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-info/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold text-info">₹{totalAllocated - totalSpent}</p>
          </div>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.allocated) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <Card key={budget.id} className="p-6 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{budget.category}</h3>
                  <p className="text-sm text-muted-foreground">
                     ₹{budget.spent} of ₹{budget.allocated} spent
                   </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{percentage.toFixed(1)}% used</span>
                   <span className={isOverBudget ? "text-destructive" : "text-success"}>
                     ₹{budget.allocated - budget.spent} left
                   </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isOverBudget ? "bg-destructive" : "bg-gradient-to-r from-success to-success/80"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetSection;