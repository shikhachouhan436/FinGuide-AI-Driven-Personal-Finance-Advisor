/**
 * ============================================================================
 * BOTTOM NAVIGATION COMPONENT
 * ============================================================================
 * 
 * This component provides the main navigation interface for the FinGuide app.
 * It features a mobile-first bottom navigation bar with a prominent center
 * action button for adding new transactions.
 * 
 * Features:
 * - Fixed bottom position with blur backdrop
 * - Active state indicators for current route
 * - Prominent "Add" button with elevated design
 * - Smooth transitions and hover states
 * - Icon-based navigation with labels
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { Home, PieChart, Plus, Wallet, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Navigation item interface
 * Defines the structure for each navigation link
 */
interface NavItem {
  icon: typeof Home;    // Lucide icon component
  label: string;        // Display label below icon
  path: string;         // Route path for navigation
  isAction?: boolean;   // Whether this is a special action button (center button)
}

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

/**
 * Array of navigation items for the bottom bar
 * The center item (Add) is styled differently as the primary action
 */
const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: PieChart, label: "Analytics", path: "/analytics" },
  { icon: Plus, label: "Add", path: "/add", isAction: true },  // Primary action button
  { icon: Wallet, label: "Budget", path: "/budget" },
  { icon: User, label: "Profile", path: "/profile" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Bottom Navigation Component
 * 
 * Renders a fixed bottom navigation bar with five items.
 * The center item is styled as a floating action button for adding transactions.
 * Uses React Router for navigation and tracks active state.
 * 
 * @returns JSX.Element - The bottom navigation bar
 */
export function BottomNav() {
  // Get current location to determine active nav item
  const location = useLocation();

  return (
    <nav className="bottom-nav border-border/50" aria-label="Main navigation">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          // Check if this nav item matches current route
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          // ================================================================
          // SPECIAL STYLING FOR CENTER "ADD" BUTTON
          // Elevated, prominent design for the primary action
          // ================================================================
          if (item.isAction) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative -mt-6"
                aria-label="Add new transaction"
              >
                {/* 
                  Elevated circular button with gradient background
                  - Positioned above the nav bar for visual prominence
                  - Includes glow effect (shadow-glow)
                  - Interactive scale animations on hover/tap
                */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-emerald shadow-glow transition-transform hover:scale-105 active:scale-95">
                  <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </NavLink>
            );
          }

          // ================================================================
          // STANDARD NAV ITEMS
          // Regular navigation links with icon and label
          // ================================================================
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {/* 
                Icon container with active state background
                - Background appears when item is active
                - Icon scales up slightly when active
              */}
              <div
                className={cn(
                  "rounded-xl p-2 transition-all duration-200",
                  isActive && "bg-accent/10"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive && "scale-110"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              {/* Navigation label */}
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
