/**
 * ============================================================================
 * ADD TRANSACTION PAGE COMPONENT
 * ============================================================================
 * 
 * This component provides a form for adding new income or expense transactions.
 * It features a clean, intuitive interface with category selection, amount input,
 * date picker, and optional notes.
 * 
 * Features:
 * - Toggle between Income and Expense transaction types
 * - Dynamic category grid based on transaction type
 * - Large, easy-to-use amount input
 * - Date selection with native date picker
 * - Optional note field for transaction details
 * - Form validation before submission
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calculator, Calendar, Tag, FileText } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Category interface for transaction categorization
 */
interface Category {
  name: string;   // Category display name
  emoji: string;  // Visual emoji representation
}

/**
 * Transaction type - either income or expense
 */
type TransactionType = "income" | "expense";

// ============================================================================
// CATEGORY DATA
// ============================================================================

/**
 * Categories organized by transaction type
 * Each type has its own set of relevant categories
 */
const categories: Record<TransactionType, Category[]> = {
  // Expense categories - common spending areas
  expense: [
    { name: "Food & Dining", emoji: "🍔" },
    { name: "Transport", emoji: "🚗" },
    { name: "Shopping", emoji: "🛍️" },
    { name: "Entertainment", emoji: "🎬" },
    { name: "Housing", emoji: "🏠" },
    { name: "Healthcare", emoji: "💊" },
    { name: "Education", emoji: "📚" },
    { name: "Others", emoji: "📦" },
  ],
  // Income categories - common income sources
  income: [
    { name: "Salary", emoji: "💰" },
    { name: "Freelance", emoji: "💻" },
    { name: "Investment", emoji: "📈" },
    { name: "Gift", emoji: "🎁" },
    { name: "Refund", emoji: "↩️" },
    { name: "Others", emoji: "📦" },
  ],
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Add Transaction Page Component
 * 
 * Provides a form interface for users to add new financial transactions.
 * Supports both income and expense entries with category selection.
 * 
 * @returns JSX.Element - The add transaction form layout
 */
export default function AddTransaction() {
  // Navigation hook for routing
  const navigate = useNavigate();
  
  // Get URL search params to check for pre-selected type
  const [searchParams] = useSearchParams();
  
  // Determine initial transaction type from URL or default to expense
  const initialType: TransactionType = searchParams.get("type") === "income" ? "income" : "expense";

  // ========================================================================
  // FORM STATE
  // ========================================================================
  
  // Transaction type state (income or expense)
  const [type, setType] = useState<TransactionType>(initialType);
  
  // Amount in INR (stored as string for input handling)
  const [amount, setAmount] = useState<string>("");
  
  // Selected category name
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // Optional transaction note
  const [note, setNote] = useState<string>("");
  
  // Transaction date (defaults to today)
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Handles form submission
   * Validates required fields and shows appropriate feedback
   * In production, this would send data to the backend API
   */
  const handleSubmit = (): void => {
    // Validate required fields
    if (!amount || !selectedCategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate amount is a positive number
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Show success message
    toast.success(`${type === "income" ? "Income" : "Expense"} added successfully!`);
    
    // In production: Send transaction data to backend API
    // const transactionData = { type, amount: amountNum, category: selectedCategory, note, date };
    // await api.transactions.create(transactionData);
    
    // Navigate back to home page
    navigate("/");
  };

  /**
   * Handles back button click
   * Navigates to the previous page
   */
  const handleBack = (): void => {
    navigate(-1);
  };

  /**
   * Handles transaction type toggle
   * Resets selected category when switching types
   * 
   * @param newType - The new transaction type to set
   */
  const handleTypeChange = (newType: TransactionType): void => {
    setType(newType);
    setSelectedCategory(""); // Reset category when switching types
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* ================================================================
            HEADER SECTION
            Back button and page title
            ================================================================ */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="flex items-center gap-4 px-5 py-4">
            {/* Back navigation button */}
            <button
              onClick={handleBack}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors hover:bg-muted/80"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Add Transaction</h1>
          </div>
        </header>

        <div className="space-y-6 px-5 py-6">
          {/* ================================================================
              TRANSACTION TYPE TOGGLE
              Switch between Expense and Income modes
              ================================================================ */}
          <div className="flex gap-2 rounded-xl bg-muted p-1">
            {/* Expense Toggle Button */}
            <button
              onClick={() => handleTypeChange("expense")}
              className={cn(
                "flex-1 rounded-lg py-3 text-sm font-medium transition-all duration-200",
                type === "expense"
                  ? "bg-destructive text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Expense
            </button>
            
            {/* Income Toggle Button */}
            <button
              onClick={() => handleTypeChange("income")}
              className={cn(
                "flex-1 rounded-lg py-3 text-sm font-medium transition-all duration-200",
                type === "income"
                  ? "bg-emerald text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Income
            </button>
          </div>

          {/* ================================================================
              AMOUNT INPUT SECTION
              Large, prominent input for entering transaction amount
              ================================================================ */}
          <div className="premium-card animate-scale-in">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calculator className="h-4 w-4" />
              Amount
            </label>
            <div className="flex items-center gap-2">
              {/* Currency symbol */}
              <span className="text-3xl font-bold">₹</span>
              {/* Amount input field */}
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-none bg-transparent text-3xl font-bold placeholder:text-muted-foreground/50 focus-visible:ring-0 p-0 h-auto"
                min="0"
                step="0.01"
                aria-label="Transaction amount"
              />
            </div>
          </div>

          {/* ================================================================
              CATEGORY SELECTION GRID
              Visual grid of category options with emojis
              Categories change based on transaction type
              ================================================================ */}
          <div className="animate-slide-up stagger-1">
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Tag className="h-4 w-4" />
              Category
            </label>
            <div className="grid grid-cols-4 gap-3">
              {categories[type].map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200",
                    selectedCategory === category.name
                      ? "bg-accent text-white scale-105"
                      : "bg-muted hover:bg-muted/80"
                  )}
                  aria-pressed={selectedCategory === category.name}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-xs font-medium text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ================================================================
              DATE PICKER SECTION
              Native date input for transaction date selection
              ================================================================ */}
          <div className="premium-card animate-slide-up stagger-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-focus"
              aria-label="Transaction date"
            />
          </div>

          {/* ================================================================
              NOTES SECTION (OPTIONAL)
              Textarea for adding additional transaction details
              ================================================================ */}
          <div className="premium-card animate-slide-up stagger-3">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              Note (Optional)
            </label>
            <Textarea
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-focus min-h-[80px] resize-none"
              aria-label="Transaction note"
            />
          </div>

          {/* ================================================================
              SUBMIT BUTTON
              Dynamic styling based on transaction type
              ================================================================ */}
          <Button
            onClick={handleSubmit}
            className={cn(
              "w-full h-14 text-lg font-semibold rounded-2xl transition-all duration-200 animate-slide-up stagger-4",
              type === "income"
                ? "bg-gradient-emerald hover:opacity-90"
                : "bg-gradient-to-r from-destructive to-orange-500 hover:opacity-90"
            )}
          >
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
