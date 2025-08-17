import { useState } from "react";
import { 
  Home, 
  Wallet, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Split, 
  CreditCard,
  Brain,
  Trophy,
  Gift,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "budget", label: "Budget", icon: Wallet },
    { id: "groups", label: "Group Funds", icon: Users },
    { id: "split", label: "Split Bills", icon: Split },
    { id: "investments", label: "Investments", icon: TrendingUp },
    { id: "jobs", label: "Part-time Jobs", icon: Briefcase },
    { id: "loans", label: "Peer Loans", icon: CreditCard },
    { id: "gamification", label: "Streaks & Points", icon: Trophy },
    { id: "offers", label: "Student Offers", icon: Gift },
    { id: "ai-insights", label: "AI Insights", icon: Brain },
  ];

  return (
    <aside className={cn(
      "bg-card border-r transition-all duration-300 h-[calc(100vh-4rem)]",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-end mb-6"
        >
          <ChevronRight className={cn(
            "h-5 w-5 transition-transform text-muted-foreground hover:text-foreground",
            collapsed ? "rotate-0" : "rotate-180"
          )} />
        </button>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                  "hover:bg-muted/50",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;