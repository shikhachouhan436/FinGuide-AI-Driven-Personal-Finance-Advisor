/**
 * ============================================================================
 * BUDGET FORM DIALOG COMPONENT
 * ============================================================================
 * 
 * A modal dialog for adding and editing budget categories.
 * Provides form inputs for category name, emoji, spending limit, and color.
 * 
 * Features:
 * - Add new budget category
 * - Edit existing budget category
 * - Emoji picker for visual representation
 * - Color selection for progress bar
 * - Form validation
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Budget interface for category-wise spending limits
 */
export interface Budget {
  id: string;
  category: string;
  emoji: string;
  spent: number;
  limit: number;
  color: string;
}

/**
 * Props for the BudgetFormDialog component
 */
interface BudgetFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget?: Budget | null;
  onSave: (budget: Budget) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Available emoji options for budget categories
 */
const EMOJI_OPTIONS = ["🍔", "🚗", "🛍️", "🎬", "💊", "🏠", "📚", "💡", "🎮", "✈️", "💪", "🎵"];

/**
 * Available color options for progress bars
 */
const COLOR_OPTIONS = [
  { name: "Warning", value: "bg-warning" },
  { name: "Info", value: "bg-info" },
  { name: "Purple", value: "bg-purple-accent" },
  { name: "Emerald", value: "bg-emerald" },
  { name: "Destructive", value: "bg-destructive" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Budget Form Dialog Component
 * 
 * Renders a modal dialog for creating or editing budget categories.
 * Handles form state, validation, and submission.
 * 
 * @param props - Component props including open state and save handler
 * @returns JSX.Element - The budget form dialog
 */
export function BudgetFormDialog({ 
  open, 
  onOpenChange, 
  budget, 
  onSave 
}: BudgetFormDialogProps) {
  // Form state
  const [category, setCategory] = useState("");
  const [emoji, setEmoji] = useState("🍔");
  const [limit, setLimit] = useState("");
  const [color, setColor] = useState("bg-warning");

  /**
   * Initialize form with budget data when editing
   */
  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setEmoji(budget.emoji);
      setLimit(budget.limit.toString());
      setColor(budget.color);
    } else {
      // Reset form for new budget
      setCategory("");
      setEmoji("🍔");
      setLimit("");
      setColor("bg-warning");
    }
  }, [budget, open]);

  /**
   * Handles form submission
   * Validates inputs and calls onSave with budget data
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const budgetData: Budget = {
      id: budget?.id || crypto.randomUUID(),
      category,
      emoji,
      spent: budget?.spent || 0,
      limit: parseFloat(limit) || 0,
      color,
    };

    onSave(budgetData);
    onOpenChange(false);
  };

  /**
   * Formats a number as Indian Rupee currency
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {budget ? "Edit Budget" : "Add New Budget"}
          </DialogTitle>
          <DialogDescription>
            {budget 
              ? "Update your budget category settings." 
              : "Create a new budget category to track your spending."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Category Name Input */}
          <div className="space-y-2">
            <Label htmlFor="category">Category Name</Label>
            <Input
              id="category"
              placeholder="e.g., Food & Dining"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="bg-muted border-border"
            />
          </div>

          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label>Select Icon</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={cn(
                    "h-10 w-10 rounded-lg text-xl transition-all duration-200",
                    emoji === e
                      ? "bg-primary/20 ring-2 ring-primary scale-110"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Limit Input */}
          <div className="space-y-2">
            <Label htmlFor="limit">Monthly Limit (₹)</Label>
            <Input
              id="limit"
              type="number"
              placeholder="e.g., 15000"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
              min="0"
              className="bg-muted border-border"
            />
            {limit && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(limit) || 0)}
              </p>
            )}
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label>Progress Bar Color</Label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={cn(
                    "h-8 w-8 rounded-full transition-all duration-200",
                    c.value,
                    color === c.value
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                      : "opacity-60 hover:opacity-100"
                  )}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-emerald"
              disabled={!category || !limit}
            >
              {budget ? "Save Changes" : "Add Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
