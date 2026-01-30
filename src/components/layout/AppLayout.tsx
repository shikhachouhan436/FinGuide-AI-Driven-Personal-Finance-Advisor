/**
 * ============================================================================
 * APP LAYOUT COMPONENT
 * ============================================================================
 * 
 * This component provides the base layout structure for the FinGuide app.
 * It wraps all page content and includes the persistent bottom navigation.
 * 
 * Features:
 * - Consistent layout across all pages
 * - Bottom navigation bar integration
 * - Safe area padding for mobile devices
 * - Responsive design support
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Props interface for AppLayout component
 */
interface AppLayoutProps {
  children: ReactNode;  // Page content to render within the layout
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * App Layout Component
 * 
 * Provides a consistent wrapper for all app pages with:
 * - Full-height background
 * - Bottom padding to accommodate navigation bar
 * - Persistent bottom navigation component
 * 
 * @param children - The page content to render
 * @returns JSX.Element - The layout wrapper with navigation
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* 
        Main content area 
        - safe-bottom: Adds padding for devices with bottom safe areas (iPhone notch)
        - pb-20: Bottom padding to prevent content from being hidden behind nav bar
      */}
      <main className="safe-bottom pb-20">
        {children}
      </main>
      
      {/* 
        Persistent bottom navigation bar 
        Visible on all pages for easy navigation
      */}
      <BottomNav />
    </div>
  );
}
