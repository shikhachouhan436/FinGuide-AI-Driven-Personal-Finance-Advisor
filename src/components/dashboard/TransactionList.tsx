/**
 * ============================================================================
 * TRANSACTION LIST COMPONENT
 * ============================================================================
 * 
 * This component displays a list of recent financial transactions.
 * Each transaction shows the title, category, amount, and date with
 * color-coded icons based on the transaction category.
 * 
 * Features:
 * - Recent transactions display with category icons
 * - Color-coded amounts (green for income, default for expenses)
 * - Category and date metadata
 * - "See All" link to full transactions page
 * - Animated card appearance with staggered timing
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Home, 
  Smartphone, 
  Heart, 
  Briefcase, 
  Gift,
  LucideIcon,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Transaction interface
 * Defines the structure for each transaction item
 */
interface Transaction {
  id: string;                      // Unique transaction identifier
  title: string;                   // Transaction description
  category: string;                // Category name (Food, Transport, etc.)
  amount: number;                  // Transaction amount in INR
  type: "income" | "expense";      // Transaction type for color coding
  date: string;                    // Formatted date string
  icon: LucideIcon;                // Category-specific icon
  iconBg: string;                  // Icon background color class
  iconColor: string;               // Icon color class
}

// ============================================================================
// MOCK DATA - Replace with API calls in production
// ============================================================================

/**
 * Sample transaction data for demonstration
 * In production, this would be fetched from the backend API
 */
const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    category: "Food",
    amount: 2450,
    type: "expense",
    date: "Today, 10:30 AM",
    icon: ShoppingBag,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    id: "2",
    title: "Salary Credited",
    category: "Income",
    amount: 85000,
    type: "income",
    date: "Yesterday",
    icon: Briefcase,
    iconBg: "bg-emerald/10",
    iconColor: "text-emerald",
  },
  {
    id: "3",
    title: "Uber Ride",
    category: "Transport",
    amount: 350,
    type: "expense",
    date: "Yesterday",
    icon: Car,
    iconBg: "bg-info/10",
    iconColor: "text-info",
  },
  {
    id: "4",
    title: "Restaurant",
    category: "Food",
    amount: 1200,
    type: "expense",
    date: "Jan 28",
    icon: Utensils,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    id: "5",
    title: "Rent Payment",
    category: "Housing",
    amount: 25000,
    type: "expense",
    date: "Jan 27",
    icon: Home,
    iconBg: "bg-purple-accent/10",
    iconColor: "text-purple-accent",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Transaction List Component
 * 
 * Renders a list of recent transactions with category icons,
 * amounts, and dates. Includes navigation to full transaction history.
 * 
 * @returns JSX.Element - The transaction list section
 */
export function TransactionList() {
  /**
   * Formats a number as Indian Rupee currency
   * Uses the 'en-IN' locale for proper Indian number formatting
   * 
   * @param amount - The numeric amount to format
   * @returns Formatted currency string (e.g., "₹2,450")
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* ================================================================
          SECTION HEADER
          Title and "See All" navigation link
          ================================================================ */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Link
          to="/transactions"
          className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          See All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* ================================================================
          TRANSACTIONS LIST
          Individual transaction cards with staggered animation
          ================================================================ */}
      <div className="space-y-2">
        {mockTransactions.map((transaction, index) => {
          const Icon = transaction.icon;
          
          return (
            <div
              key={transaction.id}
              className={cn(
                // Base card styles
                "transaction-item premium-card p-4",
                // Staggered animation for sequential appearance
                "animate-slide-up opacity-0",
                `stagger-${index + 1}`
              )}
              style={{ animationFillMode: "forwards" }}
            >
              {/* Transaction info section */}
              <div className="flex items-center gap-3">
                {/* Category icon with colored background */}
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    transaction.iconBg
                  )}
                >
                  <Icon className={cn("h-5 w-5", transaction.iconColor)} />
                </div>
                
                {/* Transaction details */}
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              
              {/* Transaction amount with +/- prefix based on type */}
              <p
                className={cn(
                  "font-semibold",
                  // Green color for income, default for expenses
                  transaction.type === "income"
                    ? "text-emerald"
                    : "text-foreground"
                )}
              >
                {/* Add + or - prefix based on transaction type */}
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
