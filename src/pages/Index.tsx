import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/Sidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import BudgetSection from "@/components/dashboard/BudgetSection";
import GroupFundsSection from "@/components/dashboard/GroupFundsSection";
import SplitBillsSection from "@/components/dashboard/SplitBillsSection";
import InvestmentsSection from "@/components/dashboard/InvestmentsSection";
import JobsSection from "@/components/dashboard/JobsSection";
import LoansSection from "@/components/dashboard/LoansSection";
import AIInsightsSection from "@/components/dashboard/AIInsightsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "budget":
        return <BudgetSection />;
      case "groups":
        return <GroupFundsSection />;
      case "split":
        return <SplitBillsSection />;
      case "investments":
        return <InvestmentsSection />;
      case "jobs":
        return <JobsSection />;
      case "loans":
        return <LoansSection />;
      case "ai-insights":
        return <AIInsightsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="flex">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
