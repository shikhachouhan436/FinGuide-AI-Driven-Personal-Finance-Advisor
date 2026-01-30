/**
 * ============================================================================
 * ADD SAVINGS DIALOG COMPONENT
 * ============================================================================
 * 
 * A modal dialog for adding savings to an existing goal.
 * Allows users to record deposits towards their savings goals.
 * 
 * Features:
 * - Quick amount buttons
 * - Custom amount input
 * - Current progress display
 * - Real-time preview of new total
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
import { Goal } from "./GoalFormDialog";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Props for the AddSavingsDialog component
 */
interface AddSavingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSave: (goalId: string, amount: number) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Quick add amount options in INR
 */
const QUICK_AMOUNTS = [1000, 2500, 5000, 10000];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Add Savings Dialog Component
 * 
 * Renders a modal dialog for adding savings to a goal.
 * 
 * @param props - Component props including goal and save handler
 * @returns JSX.Element - The add savings dialog
 */
export function AddSavingsDialog({
  open,
  onOpenChange,
  goal,
  onSave,
}: AddSavingsDialogProps) {
  const [amount, setAmount] = useState("");

  /**
   * Reset form when dialog opens
   */
  useEffect(() => {
    if (open) {
      setAmount("");
    }
  }, [open]);

  /**
   * Formats a number as Indian Rupee currency
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal && amount) {
      onSave(goal.id, parseFloat(amount));
      onOpenChange(false);
    }
  };

  /**
   * Handles quick amount button click
   */
  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  if (!goal) return null;

  const currentAmount = parseFloat(amount) || 0;
  const newTotal = goal.saved + currentAmount;
  const newPercentage = Math.min((newTotal / goal.target) * 100, 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{goal.emoji}</span>
            Add Savings to {goal.title}
          </DialogTitle>
          <DialogDescription>
            Current progress: {formatCurrency(goal.saved)} of {formatCurrency(goal.target)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label>Quick Add</Label>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  onClick={() => handleQuickAmount(quickAmount)}
                  className={cn(
                    "text-sm",
                    amount === quickAmount.toString() && "ring-2 ring-primary"
                  )}
                >
                  ₹{quickAmount.toLocaleString("en-IN")}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Custom Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              className="bg-muted border-border text-lg"
            />
          </div>

          {/* Preview of New Progress */}
          {currentAmount > 0 && (
            <div className="space-y-3 p-4 rounded-xl bg-muted/50">
              <div className="flex justify-between text-sm">
                <span>New Total</span>
                <span className="font-semibold text-emerald">
                  {formatCurrency(newTotal)}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${newPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {Math.round(newPercentage)}% of goal achieved
              </p>
            </div>
          )}

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
              disabled={!amount || currentAmount <= 0}
            >
              Add ₹{currentAmount.toLocaleString("en-IN")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
