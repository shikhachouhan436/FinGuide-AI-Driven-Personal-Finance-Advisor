/**
 * ============================================================================
 * BUDGET & GOALS PAGE COMPONENT
 * ============================================================================
 * 
 * This component manages monthly budgets and long-term financial goals.
 * It provides a dual-tab interface for tracking spending limits by category
 * and monitoring progress towards savings goals.
 * 
 * Features:
 * - Tab navigation between Budget and Goals views
 * - Monthly budget overview with progress tracking
 * - Category-wise budget management with visual progress bars
 * - Long-term savings goals with deadline tracking
 * - Full CRUD operations (Create, Read, Update, Delete)
 * - Add savings to goals functionality
 * 
 * @author FinGuide Development Team
 * @version 2.0.0
 * ============================================================================
 */

import { useState } from "react";
import { Target, Plus, TrendingUp, Wallet, Edit2, Trash2, PiggyBank } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BudgetFormDialog, Budget } from "@/components/budget/BudgetFormDialog";
import { GoalFormDialog, Goal } from "@/components/budget/GoalFormDialog";
import { DeleteConfirmDialog } from "@/components/budget/DeleteConfirmDialog";
import { AddSavingsDialog } from "@/components/budget/AddSavingsDialog";

// ============================================================================
// INITIAL DATA - Stored in state for CRUD operations
// ============================================================================

/**
 * Initial budget categories with spending limits
 * This data is managed in component state for user modifications
 */
const INITIAL_BUDGETS: Budget[] = [
  { id: "1", category: "Food & Dining", emoji: "🍔", spent: 12500, limit: 15000, color: "bg-warning" },
  { id: "2", category: "Transport", emoji: "🚗", spent: 5500, limit: 6000, color: "bg-info" },
  { id: "3", category: "Shopping", emoji: "🛍️", spent: 8000, limit: 12000, color: "bg-purple-accent" },
  { id: "4", category: "Entertainment", emoji: "🎬", spent: 4500, limit: 4000, color: "bg-destructive" },
  { id: "5", category: "Healthcare", emoji: "💊", spent: 2000, limit: 5000, color: "bg-emerald" },
];

/**
 * Initial savings goals with progress tracking
 * This data is managed in component state for user modifications
 */
const INITIAL_GOALS: Goal[] = [
  { id: "1", title: "Emergency Fund", emoji: "🏦", saved: 150000, target: 300000, deadline: "Dec 2026" },
  { id: "2", title: "New Laptop", emoji: "💻", saved: 45000, target: 80000, deadline: "Jun 2026" },
  { id: "3", title: "Vacation Trip", emoji: "✈️", saved: 25000, target: 100000, deadline: "Oct 2026" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Budget & Goals Page Component
 * 
 * Provides a comprehensive interface for managing monthly budgets
 * and tracking progress towards long-term financial goals.
 * Supports full CRUD operations for both budgets and goals.
 * 
 * @returns JSX.Element - The budget and goals page layout
 */
export default function BudgetPage() {
  // ========================================================================
  // STATE MANAGEMENT
  // ========================================================================
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"budget" | "goals">("budget");
  
  // Data state - budgets and goals are stored here for CRUD operations
  const [budgets, setBudgets] = useState<Budget[]>(INITIAL_BUDGETS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  
  // Dialog states for Budget operations
  const [budgetFormOpen, setBudgetFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [deleteBudgetOpen, setDeleteBudgetOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);
  
  // Dialog states for Goal operations
  const [goalFormOpen, setGoalFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deleteGoalOpen, setDeleteGoalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [addSavingsOpen, setAddSavingsOpen] = useState(false);
  const [goalForSavings, setGoalForSavings] = useState<Goal | null>(null);

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  /**
   * Formats a number as Indian Rupee currency
   * Uses the 'en-IN' locale for proper Indian number formatting
   * 
   * @param amount - The numeric amount to format
   * @returns Formatted currency string (e.g., "₹1,50,000")
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ========================================================================
  // BUDGET CRUD HANDLERS
  // ========================================================================

  /**
   * Opens the budget form dialog for adding a new budget
   */
  const handleAddBudget = () => {
    setEditingBudget(null);
    setBudgetFormOpen(true);
  };

  /**
   * Opens the budget form dialog for editing an existing budget
   * 
   * @param budget - The budget to edit
   */
  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setBudgetFormOpen(true);
  };

  /**
   * Saves a budget (creates new or updates existing)
   * 
   * @param budgetData - The budget data to save
   */
  const handleSaveBudget = (budgetData: Budget) => {
    if (editingBudget) {
      // Update existing budget
      setBudgets(prev => 
        prev.map(b => b.id === budgetData.id ? budgetData : b)
      );
      toast.success(`Budget "${budgetData.category}" updated successfully!`);
    } else {
      // Add new budget
      setBudgets(prev => [...prev, budgetData]);
      toast.success(`Budget "${budgetData.category}" created successfully!`);
    }
  };

  /**
   * Opens delete confirmation dialog for a budget
   * 
   * @param budget - The budget to delete
   */
  const handleDeleteBudgetClick = (budget: Budget) => {
    setBudgetToDelete(budget);
    setDeleteBudgetOpen(true);
  };

  /**
   * Confirms and executes budget deletion
   */
  const handleConfirmDeleteBudget = () => {
    if (budgetToDelete) {
      setBudgets(prev => prev.filter(b => b.id !== budgetToDelete.id));
      toast.success(`Budget "${budgetToDelete.category}" deleted successfully!`);
      setBudgetToDelete(null);
      setDeleteBudgetOpen(false);
    }
  };

  // ========================================================================
  // GOAL CRUD HANDLERS
  // ========================================================================

  /**
   * Opens the goal form dialog for adding a new goal
   */
  const handleAddGoal = () => {
    setEditingGoal(null);
    setGoalFormOpen(true);
  };

  /**
   * Opens the goal form dialog for editing an existing goal
   * 
   * @param goal - The goal to edit
   */
  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setGoalFormOpen(true);
  };

  /**
   * Saves a goal (creates new or updates existing)
   * 
   * @param goalData - The goal data to save
   */
  const handleSaveGoal = (goalData: Goal) => {
    if (editingGoal) {
      // Update existing goal
      setGoals(prev => 
        prev.map(g => g.id === goalData.id ? goalData : g)
      );
      toast.success(`Goal "${goalData.title}" updated successfully!`);
    } else {
      // Add new goal
      setGoals(prev => [...prev, goalData]);
      toast.success(`Goal "${goalData.title}" created successfully!`);
    }
  };

  /**
   * Opens delete confirmation dialog for a goal
   * 
   * @param goal - The goal to delete
   */
  const handleDeleteGoalClick = (goal: Goal) => {
    setGoalToDelete(goal);
    setDeleteGoalOpen(true);
  };

  /**
   * Confirms and executes goal deletion
   */
  const handleConfirmDeleteGoal = () => {
    if (goalToDelete) {
      setGoals(prev => prev.filter(g => g.id !== goalToDelete.id));
      toast.success(`Goal "${goalToDelete.title}" deleted successfully!`);
      setGoalToDelete(null);
      setDeleteGoalOpen(false);
    }
  };

  /**
   * Opens the add savings dialog for a goal
   * 
   * @param goal - The goal to add savings to
   */
  const handleAddSavingsClick = (goal: Goal) => {
    setGoalForSavings(goal);
    setAddSavingsOpen(true);
  };

  /**
   * Adds savings amount to a goal
   * 
   * @param goalId - The ID of the goal
   * @param amount - The amount to add
   */
  const handleAddSavings = (goalId: string, amount: number) => {
    setGoals(prev => 
      prev.map(g => 
        g.id === goalId 
          ? { ...g, saved: g.saved + amount }
          : g
      )
    );
    const goal = goals.find(g => g.id === goalId);
    toast.success(`Added ${formatCurrency(amount)} to "${goal?.title}"!`);
  };

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  // Calculate aggregate statistics for budget overview
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  
  // Calculate aggregate statistics for goals overview
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <AppLayout>
      <div className="min-h-screen pb-24">
        {/* ================================================================
            HEADER SECTION
            Sticky header with page title and add button
            ================================================================ */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="flex items-center justify-between px-5 py-4">
            <h1 className="text-xl font-bold">Budget & Goals</h1>
            {/* Add new budget/goal button */}
            <Button 
              size="icon" 
              className="bg-gradient-emerald rounded-xl h-10 w-10"
              onClick={activeTab === "budget" ? handleAddBudget : handleAddGoal}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="space-y-6 px-5 py-6">
          {/* ================================================================
              TAB TOGGLE
              Switch between Budget and Goals views
              ================================================================ */}
          <div className="flex gap-2 rounded-xl bg-muted p-1">
            {/* Budget Tab */}
            <button
              onClick={() => setActiveTab("budget")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all duration-200",
                activeTab === "budget"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Wallet className="h-4 w-4" />
              Budget
            </button>
            
            {/* Goals Tab */}
            <button
              onClick={() => setActiveTab("goals")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all duration-200",
                activeTab === "goals"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Target className="h-4 w-4" />
              Goals
            </button>
          </div>

          {/* ================================================================
              CONDITIONAL CONTENT RENDERING
              Shows either Budget or Goals view based on active tab
              ================================================================ */}
          {activeTab === "budget" ? (
            <>
              {/* ==============================================================
                  BUDGET TAB CONTENT
                  ============================================================== */}
              
              {/* Budget Overview Summary Card */}
              <div className="premium-card relative overflow-hidden animate-scale-in">
                {/* Decorative background blur */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-warning/10 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Monthly Budget</h2>
                    <span className="text-sm text-muted-foreground">January 2026</span>
                  </div>
                  
                  {/* Total spent vs total budget display */}
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{formatCurrency(totalSpent)}</span>
                    <span className="text-muted-foreground mb-1">/ {formatCurrency(totalBudget)}</span>
                  </div>
                  
                  {/* Overall progress bar */}
                  <div className="mt-4 progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
                    />
                  </div>
                  
                  {/* Remaining budget text */}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {totalBudget - totalSpent > 0 
                      ? `${formatCurrency(totalBudget - totalSpent)} remaining`
                      : `Over budget by ${formatCurrency(totalSpent - totalBudget)}`
                    }
                  </p>
                </div>
              </div>

              {/* Empty State */}
              {budgets.length === 0 && (
                <div className="premium-card text-center py-12">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Budget Categories</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Create your first budget category to start tracking spending.
                  </p>
                  <Button onClick={handleAddBudget} className="bg-gradient-emerald">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Budget
                  </Button>
                </div>
              )}

              {/* Budget Categories List */}
              <div className="space-y-3">
                {budgets.map((budget, index) => {
                  // Calculate spending percentage
                  const percentage = (budget.spent / budget.limit) * 100;
                  // Check if over budget
                  const isOver = budget.spent > budget.limit;

                  return (
                    <div
                      key={budget.id}
                      className={cn(
                        "premium-card !p-4 animate-slide-up opacity-0",
                        `stagger-${Math.min(index + 1, 5)}`
                      )}
                      style={{ animationFillMode: "forwards" }}
                    >
                      {/* Category header with emoji and amounts */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{budget.emoji}</span>
                          <div>
                            <p className="font-medium">{budget.category}</p>
                            <p className={cn(
                              "text-sm",
                              isOver ? "text-destructive font-medium" : "text-muted-foreground"
                            )}>
                              {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-1">
                          {/* Edit budget button */}
                          <button 
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            onClick={() => handleEditBudget(budget)}
                            title="Edit budget"
                          >
                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                          </button>
                          {/* Delete budget button */}
                          <button 
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                            onClick={() => handleDeleteBudgetClick(budget)}
                            title="Delete budget"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Category progress bar */}
                      <div className="progress-bar">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isOver ? "bg-destructive" : budget.color
                          )}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>

                      {/* Over budget warning */}
                      {isOver && (
                        <p className="mt-2 text-xs text-destructive">
                          Over budget by {formatCurrency(budget.spent - budget.limit)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* ==============================================================
                  GOALS TAB CONTENT
                  ============================================================== */}
              
              {/* Goals Overview Summary Card */}
              <div className="premium-card relative overflow-hidden animate-scale-in">
                {/* Decorative background blur */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald/10 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Total Savings</h2>
                    <TrendingUp className="h-5 w-5 text-emerald" />
                  </div>
                  
                  {/* Total saved vs total target display */}
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{formatCurrency(totalSaved)}</span>
                    <span className="text-muted-foreground mb-1">/ {formatCurrency(totalTarget)}</span>
                  </div>
                  
                  {/* Overall goals progress bar */}
                  <div className="mt-4 progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(totalSaved / totalTarget) * 100}%` }}
                    />
                  </div>

                  {/* Remaining to save */}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatCurrency(totalTarget - totalSaved)} remaining to reach all goals
                  </p>
                </div>
              </div>

              {/* Empty State */}
              {goals.length === 0 && (
                <div className="premium-card text-center py-12">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Savings Goals</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Create your first savings goal to start tracking progress.
                  </p>
                  <Button onClick={handleAddGoal} className="bg-gradient-emerald">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              )}

              {/* Individual Goals List */}
              <div className="space-y-3">
                {goals.map((goal, index) => {
                  // Calculate goal completion percentage
                  const percentage = (goal.saved / goal.target) * 100;
                  const isComplete = goal.saved >= goal.target;

                  return (
                    <div
                      key={goal.id}
                      className={cn(
                        "premium-card animate-slide-up opacity-0",
                        `stagger-${Math.min(index + 1, 5)}`
                      )}
                      style={{ animationFillMode: "forwards" }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Goal emoji icon */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-2xl shrink-0">
                          {goal.emoji}
                        </div>
                        
                        {/* Goal details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold truncate">{goal.title}</h3>
                            {/* Completion percentage badge */}
                            <span className={cn(
                              "text-sm font-medium shrink-0",
                              isComplete ? "text-emerald" : "text-muted-foreground"
                            )}>
                              {Math.round(percentage)}%
                            </span>
                          </div>
                          
                          {/* Saved vs target amount */}
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(goal.saved)} of {formatCurrency(goal.target)}
                          </p>
                          
                          {/* Goal progress bar */}
                          <div className="mt-3 progress-bar">
                            <div
                              className={cn(
                                "progress-fill",
                                isComplete && "!bg-emerald"
                              )}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          
                          {/* Deadline and action buttons */}
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              Target: {goal.deadline}
                            </p>
                            
                            {/* Action buttons */}
                            <div className="flex items-center gap-1">
                              {/* Add savings button */}
                              {!isComplete && (
                                <button 
                                  className="p-2 rounded-lg hover:bg-emerald/10 transition-colors"
                                  onClick={() => handleAddSavingsClick(goal)}
                                  title="Add savings"
                                >
                                  <PiggyBank className="h-4 w-4 text-emerald" />
                                </button>
                              )}
                              {/* Edit goal button */}
                              <button 
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                onClick={() => handleEditGoal(goal)}
                                title="Edit goal"
                              >
                                <Edit2 className="h-4 w-4 text-muted-foreground" />
                              </button>
                              {/* Delete goal button */}
                              <button 
                                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                                onClick={() => handleDeleteGoalClick(goal)}
                                title="Delete goal"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </button>
                            </div>
                          </div>

                          {/* Goal complete message */}
                          {isComplete && (
                            <p className="mt-2 text-xs text-emerald font-medium">
                              🎉 Goal achieved! Congratulations!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ====================================================================
          DIALOG COMPONENTS
          Modals for CRUD operations
          ==================================================================== */}
      
      {/* Budget Form Dialog (Add/Edit) */}
      <BudgetFormDialog
        open={budgetFormOpen}
        onOpenChange={setBudgetFormOpen}
        budget={editingBudget}
        onSave={handleSaveBudget}
      />

      {/* Goal Form Dialog (Add/Edit) */}
      <GoalFormDialog
        open={goalFormOpen}
        onOpenChange={setGoalFormOpen}
        goal={editingGoal}
        onSave={handleSaveGoal}
      />

      {/* Delete Budget Confirmation */}
      <DeleteConfirmDialog
        open={deleteBudgetOpen}
        onOpenChange={setDeleteBudgetOpen}
        itemName={budgetToDelete?.category || ""}
        itemType="budget"
        onConfirm={handleConfirmDeleteBudget}
      />

      {/* Delete Goal Confirmation */}
      <DeleteConfirmDialog
        open={deleteGoalOpen}
        onOpenChange={setDeleteGoalOpen}
        itemName={goalToDelete?.title || ""}
        itemType="goal"
        onConfirm={handleConfirmDeleteGoal}
      />

      {/* Add Savings Dialog */}
      <AddSavingsDialog
        open={addSavingsOpen}
        onOpenChange={setAddSavingsOpen}
        goal={goalForSavings}
        onSave={handleAddSavings}
      />
    </AppLayout>
  );
}
