/**
 * ============================================================================
 * INDEX PAGE (DASHBOARD) COMPONENT
 * ============================================================================
 * 
 * This is the main dashboard page of FinGuide - the home screen that users
 * see after logging in. It provides a comprehensive overview of the user's
 * financial status including balance, quick actions, AI insights, spending
 * charts, budget progress, and recent transactions.
 * 
 * Features:
 * - Balance overview with income/expense summary
 * - Quick action buttons for common tasks
 * - AI-powered financial insights
 * - Interactive spending chart
 * - Budget progress tracking
 * - Financial health score
 * - Recent transactions list
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { Bell, Menu } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { FinancialHealthScore } from "@/components/dashboard/FinancialHealthScore";
import { toast } from "sonner";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Index Page (Dashboard) Component
 * 
 * The main landing page after login, displaying a comprehensive dashboard
 * with all key financial metrics and quick access to common features.
 * 
 * @returns JSX.Element - The dashboard page layout
 */
const Index = () => {
  /**
   * Handles notification bell click
   * In production, would open a notifications panel/modal
   */
  const handleNotificationClick = () => {
    toast.info("Notifications - Feature coming soon!");
  };

  /**
   * Handles menu button click
   * In production, would open a side drawer/menu
   */
  const handleMenuClick = () => {
    toast.info("Menu - Feature coming soon!");
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* ================================================================
            HEADER SECTION
            Sticky header with user greeting, notifications, and menu
            Features glassmorphism effect for premium look
            ================================================================ */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="flex items-center justify-between px-5 py-4">
            {/* User greeting section */}
            <div className="flex items-center gap-3">
              {/* App logo/avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-emerald">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              {/* Greeting text */}
              <div>
                <p className="text-xs text-muted-foreground">Good Morning</p>
                <p className="font-semibold">Sikha Chouhan</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {/* Notification bell button */}
              <button 
                onClick={handleNotificationClick}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors hover:bg-muted/80"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {/* Notification indicator dot */}
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
              </button>
              
              {/* Menu button */}
              <button 
                onClick={handleMenuClick}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors hover:bg-muted/80"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* ================================================================
            MAIN CONTENT AREA
            Scrollable content with all dashboard widgets
            ================================================================ */}
        <div className="space-y-6 px-5 py-6">
          {/* ==============================================================
              BALANCE CARD
              Primary financial overview showing total balance, 
              income, expenses, and savings rate
              ============================================================== */}
          <div className="animate-scale-in">
            <BalanceCard
              balance={152840}      // Total current balance in INR
              income={95000}        // Total income for current period
              expenses={59000}      // Total expenses for current period
              savingsRate={18.5}    // Savings rate percentage
            />
          </div>

          {/* ==============================================================
              QUICK ACTIONS
              Fast access buttons for common tasks like adding
              transactions, transfers, etc.
              ============================================================== */}
          <section>
            <QuickActions />
          </section>

          {/* ==============================================================
              AI INSIGHTS
              AI-powered financial recommendations, achievements,
              and warnings based on spending patterns
              ============================================================== */}
          <section>
            <AIInsights />
          </section>

          {/* ==============================================================
              SPENDING CHART
              Visual pie chart showing expense distribution
              across different categories
              ============================================================== */}
          <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <SpendingChart />
          </section>

          {/* ==============================================================
              TWO COLUMN LAYOUT
              Side-by-side layout for budget progress and health score
              on larger screens (single column on mobile)
              ============================================================== */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Budget Progress Card */}
            <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <BudgetProgress />
            </section>

            {/* Financial Health Score Card */}
            <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <FinancialHealthScore />
            </section>
          </div>

          {/* ==============================================================
              RECENT TRANSACTIONS
              List of the most recent financial transactions
              with category icons and amount display
              ============================================================== */}
          <section>
            <TransactionList />
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
