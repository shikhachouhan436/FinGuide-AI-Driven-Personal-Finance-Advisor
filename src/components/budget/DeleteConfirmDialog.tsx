/**
 * ============================================================================
 * DELETE CONFIRM DIALOG COMPONENT
 * ============================================================================
 * 
 * A confirmation dialog for deleting budget categories or savings goals.
 * Provides a warning message and confirmation buttons.
 * 
 * Features:
 * - Displays item name being deleted
 * - Warning message about irreversible action
 * - Cancel and confirm buttons
 * - Customizable title and description
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Props for the DeleteConfirmDialog component
 */
interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  itemType: "budget" | "goal";
  onConfirm: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Delete Confirm Dialog Component
 * 
 * Renders an alert dialog for confirming deletion of budgets or goals.
 * 
 * @param props - Component props including item details and handlers
 * @returns JSX.Element - The delete confirmation dialog
 */
export function DeleteConfirmDialog({
  open,
  onOpenChange,
  itemName,
  itemType,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {itemType === "budget" ? "Budget Category" : "Savings Goal"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>"{itemName}"</strong>? 
            {itemType === "budget" 
              ? " All spending data for this category will be removed."
              : " Your savings progress will be lost."}
            <br /><br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
