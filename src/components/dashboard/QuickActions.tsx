/**
 * ============================================================================
 * QUICK ACTIONS COMPONENT
 * ============================================================================
 * 
 * This component provides quick access buttons for common financial actions.
 * Displayed as a horizontal grid of action items with distinctive icons
 * and color coding for easy identification.
 * 
 * Features:
 * - Four main action buttons: Income, Expense, Goals, Budget
 * - Color-coded icons for visual distinction
 * - Animated appearance with staggered timing
 * - Interactive hover and tap feedback
 * - Direct navigation to relevant pages
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { ArrowUpRight, ArrowDownLeft, Target, Wallet, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Quick action item interface
 * Defines the structure for each action button
 */
interface QuickAction {
  icon: LucideIcon;   // Lucide icon component to display
  label: string;      // Text label below the icon
  path: string;       // Navigation path when clicked
  color: string;      // Text color class for the icon
  bgColor: string;    // Background color class for the icon container
}

// ============================================================================
// ACTION CONFIGURATION
// ============================================================================

/**
 * Array of quick action items
 * Each action navigates to a different page/feature
 */
const actions: QuickAction[] = [
  {
    icon: ArrowUpRight,
    label: "Income",
    path: "/add?type=income",        // Pre-selects income type on add page
    color: "text-emerald",           // Green for income
    bgColor: "bg-emerald/10",
  },
  {
    icon: ArrowDownLeft,
    label: "Expense",
    path: "/add?type=expense",       // Pre-selects expense type on add page
    color: "text-destructive",       // Red for expenses
    bgColor: "bg-destructive/10",
  },
  {
    icon: Target,
    label: "Goals",
    path: "/budget?tab=goals",       // Opens budget page with goals tab active
    color: "text-info",              // Blue for goals
    bgColor: "bg-info/10",
  },
  {
    icon: Wallet,
    label: "Budget",
    path: "/budget",                 // Opens budget overview page
    color: "text-purple-accent",     // Purple for budget
    bgColor: "bg-purple-accent/10",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Quick Actions Component
 * 
 * Renders a grid of action buttons for quick access to common tasks.
 * Each button navigates to the appropriate page with any necessary
 * query parameters for pre-selection.
 * 
 * @returns JSX.Element - Grid of quick action buttons
 */
export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        
        return (
          <Link
            key={action.label}
            to={action.path}
            className={cn(
              // Base styles for action button
              "flex flex-col items-center gap-2 rounded-2xl p-4",
              // Interactive states
              "transition-all duration-200 hover:scale-105 active:scale-95",
              // Staggered animation - each item appears slightly after the previous
              "animate-slide-up opacity-0",
              `stagger-${index + 1}`
            )}
            style={{ animationFillMode: "forwards" }}
          >
            {/* Icon container with color-coded background */}
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                action.bgColor
              )}
            >
              <Icon className={cn("h-5 w-5", action.color)} />
            </div>
            
            {/* Action label */}
            <span className="text-xs font-medium text-muted-foreground">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
