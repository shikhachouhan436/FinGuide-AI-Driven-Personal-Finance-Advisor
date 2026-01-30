/**
 * ============================================================================
 * BALANCE CARD COMPONENT
 * ============================================================================
 * 
 * This component displays the user's financial balance overview in a premium
 * card design with gradient background and glassmorphism effects.
 * 
 * Features:
 * - Toggle visibility for sensitive balance information
 * - Total balance display with currency formatting
 * - Monthly savings rate indicator with trend arrow
 * - Income and expenses breakdown cards
 * - Decorative elements for premium aesthetic
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { Eye, EyeOff, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Props interface for BalanceCard component
 */
interface BalanceCardProps {
  balance: number;     // Total current balance in INR
  income: number;      // Total income for current period
  expenses: number;    // Total expenses for current period
  savingsRate: number; // Savings rate percentage (can be negative)
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Balance Card Component
 * 
 * Displays the user's financial summary with a premium gradient card design.
 * Includes privacy toggle to hide/show sensitive balance information.
 * 
 * @param balance - Total current balance
 * @param income - Total income for the period
 * @param expenses - Total expenses for the period
 * @param savingsRate - Percentage savings rate
 * @returns JSX.Element - The balance overview card
 */
export function BalanceCard({ balance, income, expenses, savingsRate }: BalanceCardProps) {
  // State to toggle balance visibility (privacy feature)
  const [showBalance, setShowBalance] = useState<boolean>(true);

  /**
   * Formats a number as Indian Rupee currency
   * Uses the 'en-IN' locale for proper Indian number formatting
   * 
   * @param amount - The numeric amount to format
   * @returns Formatted currency string (e.g., "₹1,52,840")
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /**
   * Toggles the balance visibility state
   * Used for privacy when in public spaces
   */
  const toggleBalanceVisibility = (): void => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-6 text-white">
      {/* ================================================================
          DECORATIVE ELEMENTS
          Background circles and blurs for premium aesthetic
          ================================================================ */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />
      <div className="absolute right-20 top-20 h-20 w-20 rounded-full bg-accent/20 blur-2xl" />

      {/* ================================================================
          HEADER SECTION
          Title and visibility toggle button
          ================================================================ */}
      <div className="relative flex items-center justify-between">
        {/* Title with sparkle icon */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-white/80">Total Balance</span>
        </div>
        
        {/* Privacy toggle button */}
        <button
          onClick={toggleBalanceVisibility}
          className="rounded-full p-2 transition-colors hover:bg-white/10"
          aria-label={showBalance ? "Hide balance" : "Show balance"}
        >
          {showBalance ? (
            <Eye className="h-5 w-5 text-white/80" />
          ) : (
            <EyeOff className="h-5 w-5 text-white/80" />
          )}
        </button>
      </div>

      {/* ================================================================
          MAIN BALANCE DISPLAY
          Large balance figure with savings rate indicator
          ================================================================ */}
      <div className="relative mt-4">
        {/* Balance amount - shows masked value when hidden */}
        <p className="font-display text-4xl font-bold tracking-tight">
          {showBalance ? formatCurrency(balance) : "₹ ••••••"}
        </p>
        
        {/* Savings rate badge with trend indicator */}
        <div className="mt-2 flex items-center gap-2">
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            savingsRate >= 0 
              ? "bg-emerald/20 text-emerald-light"  // Positive: Green
              : "bg-destructive/20 text-red-300"     // Negative: Red
          )}>
            {/* Trend arrow icon */}
            {savingsRate >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(savingsRate)}% this month
          </span>
        </div>
      </div>

      {/* ================================================================
          INCOME & EXPENSES BREAKDOWN
          Two-column grid showing income and expense totals
          ================================================================ */}
      <div className="relative mt-6 grid grid-cols-2 gap-4">
        {/* Income Card */}
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {/* Income icon with emerald background */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/20">
              <TrendingUp className="h-4 w-4 text-emerald-light" />
            </div>
            <span className="text-xs text-white/70">Income</span>
          </div>
          {/* Income amount - respects visibility toggle */}
          <p className="mt-2 text-lg font-semibold">
            {showBalance ? formatCurrency(income) : "₹ ••••"}
          </p>
        </div>
        
        {/* Expenses Card */}
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {/* Expenses icon with red background */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20">
              <TrendingDown className="h-4 w-4 text-red-300" />
            </div>
            <span className="text-xs text-white/70">Expenses</span>
          </div>
          {/* Expenses amount - respects visibility toggle */}
          <p className="mt-2 text-lg font-semibold">
            {showBalance ? formatCurrency(expenses) : "₹ ••••"}
          </p>
        </div>
      </div>
    </div>
  );
}
