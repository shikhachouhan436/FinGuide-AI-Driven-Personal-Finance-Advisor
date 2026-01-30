/**
 * ============================================================================
 * SPENDING CHART COMPONENT
 * ============================================================================
 * 
 * This component displays a pie chart visualization of spending breakdown
 * by category. Uses Recharts library for the interactive donut chart
 * with a legend showing top spending categories.
 * 
 * Features:
 * - Interactive donut/pie chart with category colors
 * - Center total display
 * - Legend with category percentages
 * - Custom tooltip with currency formatting
 * - Responsive design
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Spending data point interface
 * Each item represents a spending category
 */
interface SpendingDataPoint {
  name: string;   // Category name
  value: number;  // Amount spent in INR
  color: string;  // HSL color for the chart segment
}

// ============================================================================
// CHART DATA - Replace with API calls in production
// ============================================================================

/**
 * Sample spending data by category
 * Colors use HSL format for consistency with the design system
 */
const data: SpendingDataPoint[] = [
  { name: "Food", value: 12500, color: "hsl(38, 92%, 50%)" },       // Orange/Warning
  { name: "Transport", value: 5500, color: "hsl(199, 89%, 48%)" },  // Blue/Info
  { name: "Housing", value: 25000, color: "hsl(260, 60%, 55%)" },   // Purple
  { name: "Entertainment", value: 4500, color: "hsl(0, 72%, 51%)" }, // Red/Destructive
  { name: "Shopping", value: 8000, color: "hsl(160, 84%, 39%)" },   // Emerald
  { name: "Others", value: 3500, color: "hsl(220, 15%, 55%)" },     // Gray
];

/**
 * Calculate total spending for percentage calculations
 */
const total = data.reduce((sum, item) => sum + item.value, 0);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Spending Chart Component
 * 
 * Renders an interactive donut chart showing spending distribution
 * across different categories with a legend displaying percentages.
 * 
 * @returns JSX.Element - The spending breakdown chart section
 */
export function SpendingChart() {
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
          Title and time period indicator
          ================================================================ */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Spending Breakdown</h2>
        <span className="text-sm text-muted-foreground">This Month</span>
      </div>

      <div className="flex items-center gap-6">
        {/* ================================================================
            PIE CHART SECTION
            Interactive donut chart with center total display
            ================================================================ */}
        <div className="relative h-40 w-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}         // Creates donut hole
                outerRadius={70}         // Outer edge of donut
                paddingAngle={3}         // Gap between segments
                dataKey="value"
                stroke="none"
              >
                {/* Render each segment with its designated color */}
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              
              {/* Custom tooltip styling */}
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-md)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text overlay showing total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-sm font-bold">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* ================================================================
            LEGEND SECTION
            Shows top 4 categories with colors and percentages
            ================================================================ */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Only show top 4 categories to keep legend compact */}
          {data.slice(0, 4).map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              {/* Category indicator with color dot */}
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              
              {/* Percentage of total spending */}
              <span className="text-sm font-medium">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
