/**
 * ============================================================================
 * GOAL FORM DIALOG COMPONENT
 * ============================================================================
 * 
 * A modal dialog for adding and editing savings goals.
 * Provides form inputs for goal title, emoji, target amount, and deadline.
 * 
 * Features:
 * - Add new savings goal
 * - Edit existing savings goal
 * - Emoji picker for visual representation
 * - Target amount and deadline inputs
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
 * Goal interface for long-term savings targets
 */
export interface Goal {
  id: string;
  title: string;
  emoji: string;
  saved: number;
  target: number;
  deadline: string;
}

/**
 * Props for the GoalFormDialog component
 */
interface GoalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal?: Goal | null;
  onSave: (goal: Goal) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Available emoji options for savings goals
 */
const EMOJI_OPTIONS = ["🏦", "💻", "✈️", "🏠", "🚗", "💍", "🎓", "📱", "🏖️", "💰", "🎯", "🎁"];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Goal Form Dialog Component
 * 
 * Renders a modal dialog for creating or editing savings goals.
 * Handles form state, validation, and submission.
 * 
 * @param props - Component props including open state and save handler
 * @returns JSX.Element - The goal form dialog
 */
export function GoalFormDialog({ 
  open, 
  onOpenChange, 
  goal, 
  onSave 
}: GoalFormDialogProps) {
  // Form state
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🏦");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");

  /**
   * Initialize form with goal data when editing
   */
  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setEmoji(goal.emoji);
      setTarget(goal.target.toString());
      setSaved(goal.saved.toString());
      setDeadline(goal.deadline);
    } else {
      // Reset form for new goal
      setTitle("");
      setEmoji("🏦");
      setTarget("");
      setSaved("0");
      setDeadline("");
    }
  }, [goal, open]);

  /**
   * Handles form submission
   * Validates inputs and calls onSave with goal data
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData: Goal = {
      id: goal?.id || crypto.randomUUID(),
      title,
      emoji,
      saved: parseFloat(saved) || 0,
      target: parseFloat(target) || 0,
      deadline,
    };

    onSave(goalData);
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
            {goal ? "Edit Goal" : "Add New Goal"}
          </DialogTitle>
          <DialogDescription>
            {goal 
              ? "Update your savings goal details." 
              : "Create a new savings goal to track your progress."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Goal Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="e.g., Emergency Fund"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          {/* Target Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="target">Target Amount (₹)</Label>
            <Input
              id="target"
              type="number"
              placeholder="e.g., 100000"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
              min="0"
              className="bg-muted border-border"
            />
            {target && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(target) || 0)}
              </p>
            )}
          </div>

          {/* Amount Saved Input (only for editing) */}
          {goal && (
            <div className="space-y-2">
              <Label htmlFor="saved">Amount Saved (₹)</Label>
              <Input
                id="saved"
                type="number"
                placeholder="e.g., 50000"
                value={saved}
                onChange={(e) => setSaved(e.target.value)}
                min="0"
                className="bg-muted border-border"
              />
              {saved && (
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(parseFloat(saved) || 0)}
                </p>
              )}
            </div>
          )}

          {/* Deadline Input */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Target Deadline</Label>
            <Input
              id="deadline"
              placeholder="e.g., Dec 2026"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="bg-muted border-border"
            />
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
              disabled={!title || !target || !deadline}
            >
              {goal ? "Save Changes" : "Add Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
