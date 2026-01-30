/**
 * ============================================================================
 * ANALYTICS PAGE COMPONENT
 * ============================================================================
 * 
 * This component provides comprehensive financial analytics and visualizations
 * for tracking income vs expenses trends and spending patterns by category.
 * 
 * Features:
 * - Time range selection (Week/Month/Year)
 * - Summary cards showing total income, expenses, and savings
 * - Interactive Area Chart for income vs expense trends
 * - Horizontal Bar Chart for category-wise spending breakdown
 * - Detailed category list with percentage indicators
 * 
 * Technologies Used:
 * - Recharts library for data visualization
 * - Tailwind CSS for styling
 * - Lucide React for icons
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { useState } from "react";
import { TrendingUp, TrendingDown, Calendar, ChevronDown } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Monthly financial data structure
 * Contains income and expense values for each month
 */
interface MonthlyDataPoint {
  name: string;      // Month abbreviation (e.g., "Jan", "Feb")
  income: number;    // Total income for the month in INR
  expense: number;   // Total expenses for the month in INR
}

/**
 * Category spending data structure
 * Represents spending breakdown by category
 */
interface CategoryDataPoint {
  name: string;       // Category name (e.g., "Food", "Transport")
  amount: number;     // Amount spent in INR
  percentage: number; // Percentage of total spending
}

// ============================================================================
// MOCK DATA - Replace with API calls in production
// ============================================================================

/**
 * Sample monthly financial data for the last 6 months
 * In production, this would come from the backend API
 */
const monthlyData: MonthlyDataPoint[] = [
  { name: "Aug", income: 75000, expense: 52000 },
  { name: "Sep", income: 82000, expense: 48000 },
  { name: "Oct", income: 78000, expense: 55000 },
  { name: "Nov", income: 90000, expense: 58000 },
  { name: "Dec", income: 95000, expense: 62000 },
  { name: "Jan", income: 95000, expense: 59000 },
];

/**
 * Sample category-wise spending breakdown
 * Shows how expenses are distributed across different categories
 */
const categoryData: CategoryDataPoint[] = [
  { name: "Food", amount: 12500, percentage: 21 },
  { name: "Housing", amount: 25000, percentage: 42 },
  { name: "Transport", amount: 5500, percentage: 9 },
  { name: "Entertainment", amount: 4500, percentage: 8 },
  { name: "Shopping", amount: 8000, percentage: 14 },
  { name: "Others", amount: 3500, percentage: 6 },
];

/**
 * Available time range options for filtering analytics data
 */
const timeRanges = ["Week", "Month", "Year"] as const;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Analytics Page Component
 * 
 * Displays comprehensive financial analytics with interactive charts
 * and summary statistics. Allows users to analyze their spending patterns
 * and income trends over different time periods.
 * 
 * @returns JSX.Element - The analytics page layout
 */
export default function Analytics() {
  // State for tracking selected time range filter
  const [selectedRange, setSelectedRange] = useState<string>("Month");

  /**
   * Formats a number as Indian Rupee currency
   * Uses the 'en-IN' locale for proper Indian number formatting
   * 
   * @param value - The numeric amount to format
   * @returns Formatted currency string (e.g., "₹1,50,000")
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate aggregate statistics from monthly data
  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpense = monthlyData.reduce((sum, month) => sum + month.expense, 0);
  const netSavings = totalIncome - totalExpense;

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* ================================================================
            HEADER SECTION
            Sticky header with page title and date picker
            ================================================================ */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="flex items-center justify-between px-5 py-4">
            <h1 className="text-xl font-bold">Analytics</h1>
            {/* Date selector button - currently shows static date */}
            <button className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80">
              <Calendar className="h-4 w-4" />
              Jan 2026
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="space-y-6 px-5 py-6">
          {/* ================================================================
              TIME RANGE SELECTOR
              Toggle between Week, Month, and Year views
              ================================================================ */}
          <div className="flex gap-2 rounded-xl bg-muted p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
                  selectedRange === range
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>

          {/* ================================================================
              SUMMARY CARDS
              Quick overview of total income, expenses, and savings
              ================================================================ */}
          <div className="grid grid-cols-3 gap-3">
            {/* Total Income Card */}
            <div className="premium-card !p-4 animate-scale-in">
              <div className="flex items-center gap-1.5 text-emerald">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Income</span>
              </div>
              <p className="mt-2 text-lg font-bold">{formatCurrency(totalIncome)}</p>
            </div>
            
            {/* Total Expenses Card */}
            <div className="premium-card !p-4 animate-scale-in stagger-1">
              <div className="flex items-center gap-1.5 text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span className="text-xs font-medium">Expenses</span>
              </div>
              <p className="mt-2 text-lg font-bold">{formatCurrency(totalExpense)}</p>
            </div>
            
            {/* Net Savings Card */}
            <div className="premium-card !p-4 animate-scale-in stagger-2">
              <div className="flex items-center gap-1.5 text-info">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Saved</span>
              </div>
              <p className="mt-2 text-lg font-bold">{formatCurrency(netSavings)}</p>
            </div>
          </div>

          {/* ================================================================
              INCOME VS EXPENSE AREA CHART
              Visualizes the trend of income and expenses over time
              Uses gradient fills for better visual appeal
              ================================================================ */}
          <div className="premium-card animate-slide-up">
            <h2 className="mb-4 text-lg font-semibold">Income vs Expenses</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  {/* Gradient definitions for area fills */}
                  <defs>
                    {/* Income gradient - Emerald color */}
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                    </linearGradient>
                    {/* Expense gradient - Red color */}
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  {/* Chart grid lines */}
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  
                  {/* X-Axis configuration */}
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  
                  {/* Y-Axis configuration with currency formatting */}
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  
                  {/* Custom tooltip styling */}
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  
                  {/* Income area */}
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(160, 84%, 39%)"
                    strokeWidth={2}
                    fill="url(#incomeGradient)"
                  />
                  
                  {/* Expense area */}
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="hsl(0, 72%, 51%)"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================================================================
              CATEGORY BREAKDOWN BAR CHART
              Horizontal bar chart showing spending distribution by category
              ================================================================ */}
          <div className="premium-card animate-slide-up stagger-2">
            <h2 className="mb-4 text-lg font-semibold">Spending by Category</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  {/* Hide X-axis for cleaner look */}
                  <XAxis type="number" hide />
                  
                  {/* Y-Axis showing category names */}
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    width={80}
                  />
                  
                  {/* Custom tooltip */}
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  
                  {/* Bar visualization */}
                  <Bar
                    dataKey="amount"
                    fill="hsl(160, 84%, 39%)"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================================================================
              CATEGORY LIST
              Detailed list view of each spending category with percentages
              ================================================================ */}
          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div
                key={category.name}
                className={cn(
                  "premium-card !p-4 flex items-center justify-between animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: "forwards" }}
              >
                {/* Category info with percentage badge */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <span className="text-sm font-semibold">{category.percentage}%</span>
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                {/* Amount spent */}
                <span className="font-semibold">{formatCurrency(category.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
