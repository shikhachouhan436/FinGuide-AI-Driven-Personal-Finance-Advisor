/**
 * ============================================================================
 * BUDGET PROGRESS COMPONENT
 * ============================================================================
 * 
 * This component displays a summary of budget categories with progress bars
 * showing spending against set limits. Used on the dashboard to give users
 * a quick overview of their budget status.
 * 
 * Features:
 * - Category-wise budget progress bars
 * - Color-coded indicators (normal vs over-budget)
 * - Amount spent vs budget limit display
 * - Over-budget warnings with excess amount
 * - Animated progress bars
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Budget category interface
 * Represents a single budget category with spending data
 */
interface BudgetCategory {
  name: string;    // Category name (e.g., "Food & Dining")
  spent: number;   // Amount spent in INR
  budget: number;  // Budget limit in INR
  color: string;   // Tailwind color class for progress bar
}

// ============================================================================
// MOCK DATA - Replace with API calls in production
// ============================================================================

/**
 * Sample budget categories with spending data
 * In production, this would be fetched from the user's database
 */
const budgetCategories: BudgetCategory[] = [
  { name: "Food & Dining", spent: 12500, budget: 15000, color: "bg-warning" },
  { name: "Transport", spent: 5500, budget: 6000, color: "bg-info" },
  { name: "Entertainment", spent: 4500, budget: 4000, color: "bg-destructive" },  // Over budget
  { name: "Shopping", spent: 8000, budget: 12000, color: "bg-emerald" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Budget Progress Component
 * 
 * Renders a card showing budget progress for multiple categories.
 * Each category displays a progress bar and highlights when over budget.
 * 
 * @returns JSX.Element - The budget overview card
 */
export function BudgetProgress() {
  /**
   * Formats a number as Indian Rupee currency
   * 
   * @param amount - The numeric amount to format
   * @returns Formatted currency string (e.g., "₹12,500")
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="premium-card">
      {/* ================================================================
          SECTION HEADER
          Title and current month indicator
          ================================================================ */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Budget Overview</h2>
        <span className="text-sm text-muted-foreground">January 2026</span>
      </div>

      {/* ================================================================
          BUDGET CATEGORIES LIST
          Individual category progress bars with amounts
          ================================================================ */}
      <div className="space-y-5">
        {budgetCategories.map((category, index) => {
          // Calculate spending percentage (capped at 100% for progress bar)
          const percentage = Math.min((category.spent / category.budget) * 100, 100);
          // Check if spending exceeds the budget
          const isOverBudget = category.spent > category.budget;

          return (
            <div
              key={category.name}
              className={cn(
                // Staggered animation for sequential appearance
                "animate-slide-up opacity-0",
                `stagger-${index + 1}`
              )}
              style={{ animationFillMode: "forwards" }}
            >
              {/* Category header with name and amounts */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{category.name}</span>
                <span
                  className={cn(
                    "text-sm",
                    // Red and bold text if over budget
                    isOverBudget 
                      ? "font-semibold text-destructive" 
                      : "text-muted-foreground"
                  )}
                >
                  {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                </span>
              </div>
              
              {/* Progress bar container */}
              <div className="progress-bar">
                <div
                  className={cn(
                    "progress-fill",
                    // Use destructive color if over budget, otherwise use category color
                    isOverBudget ? "!bg-destructive" : category.color
                  )}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
              
              {/* Over budget warning message */}
              {isOverBudget && (
                <p className="mt-1 text-xs text-destructive">
                  Over budget by {formatCurrency(category.spent - category.budget)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
