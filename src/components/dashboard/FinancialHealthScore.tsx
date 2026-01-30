/**
 * ============================================================================
 * FINANCIAL HEALTH SCORE COMPONENT
 * ============================================================================
 * 
 * This component displays an overall financial health score calculated from
 * multiple financial metrics. Features a circular progress indicator with
 * a numeric score and individual metric breakdown.
 * 
 * Features:
 * - Circular SVG progress indicator with animation
 * - Overall score with descriptive label (Excellent, Good, Fair, etc.)
 * - Four key metrics: Savings Rate, Budget Control, Debt Health, Growth
 * - Color-coded score based on health level
 * - Animated metric cards with staggered appearance
 * 
 * Score Ranges:
 * - 80-100: Excellent (Green)
 * - 60-79: Good (Orange/Warning)
 * - 40-59: Fair
 * - 0-39: Needs Attention (Red)
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { TrendingUp, Shield, Target, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Health metric interface
 * Represents an individual financial health indicator
 */
interface HealthMetric {
  label: string;         // Metric display name
  value: number;         // Current value (0-100)
  maxValue: number;      // Maximum possible value (usually 100)
  icon: typeof TrendingUp;  // Icon component for the metric
  color: string;         // Tailwind color class for the icon
}

// ============================================================================
// METRICS CONFIGURATION
// ============================================================================

/**
 * Financial health metrics used to calculate overall score
 * Each metric contributes equally to the overall health score
 */
const metrics: HealthMetric[] = [
  { 
    label: "Savings Rate", 
    value: 28, 
    maxValue: 100, 
    icon: Wallet, 
    color: "text-emerald" 
  },
  { 
    label: "Budget Control", 
    value: 85, 
    maxValue: 100, 
    icon: Target, 
    color: "text-info" 
  },
  { 
    label: "Debt Health", 
    value: 92, 
    maxValue: 100, 
    icon: Shield, 
    color: "text-purple-accent" 
  },
  { 
    label: "Growth", 
    value: 67, 
    maxValue: 100, 
    icon: TrendingUp, 
    color: "text-warning" 
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Financial Health Score Component
 * 
 * Calculates and displays an overall financial health score based on
 * multiple metrics. Uses a circular progress indicator for visual impact.
 * 
 * @returns JSX.Element - The financial health score card
 */
export function FinancialHealthScore() {
  /**
   * Calculate the overall score as the average of all metrics
   * Rounded to nearest whole number
   */
  const overallScore = Math.round(
    metrics.reduce((sum, metric) => sum + metric.value, 0) / metrics.length
  );

  /**
   * Determines the color class based on the score value
   * 
   * @param score - The numeric score (0-100)
   * @returns Tailwind color class string
   */
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-emerald";     // Excellent
    if (score >= 60) return "text-warning";     // Good/Fair
    return "text-destructive";                   // Needs Attention
  };

  /**
   * Determines the descriptive label based on the score value
   * 
   * @param score - The numeric score (0-100)
   * @returns Descriptive label string
   */
  const getScoreLabel = (score: number): string => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  return (
    <div className="premium-card relative overflow-hidden">
      {/* Decorative background glow effect */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald/10 blur-3xl" />

      <div className="relative">
        {/* Section title */}
        <h2 className="text-lg font-semibold">Financial Health</h2>

        {/* ================================================================
            MAIN SCORE DISPLAY
            Circular SVG progress indicator with centered score
            ================================================================ */}
        <div className="my-6 flex items-center justify-center">
          <div className="relative">
            {/* 
              SVG Circular Progress Indicator
              - Uses stroke-dasharray to show progress
              - Rotated -90deg so progress starts from top
              - Circle circumference: 2 * π * r = 2 * 3.14 * 42 ≈ 264
            */}
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
              {/* Background circle (track) */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {/* Progress circle (filled portion) */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(var(--emerald))"
                strokeWidth="8"
                strokeLinecap="round"
                // Calculate dash array: (score/100) * circumference
                strokeDasharray={`${overallScore * 2.64} 264`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Center text overlay with score and label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-3xl font-bold", getScoreColor(overallScore))}>
                {overallScore}
              </span>
              <span className="text-xs text-muted-foreground">
                {getScoreLabel(overallScore)}
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================
            METRICS GRID
            Individual metric indicators in a 2x2 grid
            ================================================================ */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            
            return (
              <div
                key={metric.label}
                className={cn(
                  // Metric card styling
                  "flex items-center gap-2 rounded-xl bg-muted/50 p-3",
                  // Staggered animation for sequential appearance
                  "animate-scale-in opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: "forwards" }}
              >
                {/* Metric icon with designated color */}
                <Icon className={cn("h-4 w-4", metric.color)} />
                
                {/* Metric label and value */}
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-sm font-semibold">{metric.value}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
