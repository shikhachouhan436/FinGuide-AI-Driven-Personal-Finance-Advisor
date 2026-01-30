/**
 * ============================================================================
 * AI INSIGHTS COMPONENT
 * ============================================================================
 * 
 * This component displays AI-powered financial insights, tips, and warnings.
 * It provides personalized recommendations based on the user's spending
 * patterns and financial behavior.
 * 
 * Features:
 * - Three types of insights: achievements, warnings, and tips
 * - Color-coded cards based on insight type
 * - AI branding with sparkle icon
 * - Link to full insights page
 * - Animated card appearance
 * 
 * Insight Types:
 * - Achievement (green): Positive feedback on good financial behavior
 * - Warning (orange): Alerts about overspending or budget issues
 * - Tip (blue): Smart suggestions for saving money
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Insight interface for AI-generated recommendations
 */
interface Insight {
  id: string;                                    // Unique insight identifier
  type: "tip" | "warning" | "achievement";       // Insight category
  title: string;                                 // Brief insight headline
  description: string;                           // Detailed insight message
  icon: typeof Sparkles;                         // Icon component for the insight
}

// ============================================================================
// MOCK DATA - Replace with AI service in production
// ============================================================================

/**
 * Sample AI-generated insights
 * In production, these would come from the ML/AI backend service
 */
const insights: Insight[] = [
  {
    id: "1",
    type: "achievement",
    title: "Great savings this week!",
    description: "You've saved 15% more than your usual weekly average. Keep it up!",
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "warning",
    title: "Food expenses trending high",
    description: "You've spent ₹4,200 on food this week, 30% above your budget.",
    icon: AlertTriangle,
  },
  {
    id: "3",
    type: "tip",
    title: "Smart tip for you",
    description: "Consider switching to a monthly transport pass. Could save ₹2,000/month.",
    icon: Lightbulb,
  },
];

// ============================================================================
// STYLING CONFIGURATION
// ============================================================================

/**
 * Color and style configurations for each insight type
 * Uses semantic colors from the design system
 */
const typeStyles = {
  achievement: {
    bg: "bg-emerald/10",
    border: "border-emerald/20",
    iconBg: "bg-emerald/20",
    iconColor: "text-emerald",
  },
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/20",
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
  },
  tip: {
    bg: "bg-info/10",
    border: "border-info/20",
    iconBg: "bg-info/20",
    iconColor: "text-info",
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * AI Insights Component
 * 
 * Renders a list of AI-generated financial insights with color-coded
 * cards based on the type of insight (achievement, warning, or tip).
 * 
 * @returns JSX.Element - The AI insights section
 */
export function AIInsights() {
  /**
   * Handles click on "View All" link
   * Shows a toast since the insights page is not implemented yet
   */
  const handleViewAllClick = () => {
    toast.info("Full insights page - Coming soon!");
  };

  return (
    <div className="space-y-4">
      {/* ================================================================
          SECTION HEADER
          AI branding with sparkle icon and View All link
          ================================================================ */}
      <div className="flex items-center justify-between">
        {/* AI section title with gradient icon */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-emerald">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold">AI Insights</h2>
        </div>
        
        {/* View All navigation link */}
        <button
          onClick={handleViewAllClick}
          className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* ================================================================
          INSIGHTS LIST
          Color-coded insight cards with staggered animation
          ================================================================ */}
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const styles = typeStyles[insight.type];

          return (
            <div
              key={insight.id}
              className={cn(
                // Base card styles with border color based on type
                "ai-insight-card border",
                styles.border,
                // Staggered animation for sequential appearance
                "animate-slide-up opacity-0",
                `stagger-${index + 1}`
              )}
              style={{ animationFillMode: "forwards" }}
            >
              <div className="relative flex gap-3">
                {/* Icon container with type-specific colors */}
                <div
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                    styles.iconBg
                  )}
                >
                  <Icon className={cn("h-5 w-5", styles.iconColor)} />
                </div>
                
                {/* Insight content */}
                <div className="flex-1">
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
