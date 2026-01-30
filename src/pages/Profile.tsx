/**
 * ============================================================================
 * PROFILE PAGE COMPONENT
 * ============================================================================
 * 
 * This component displays the user's profile information and provides access
 * to account settings, preferences, and support options. It features a
 * premium card design with user stats and organized menu sections.
 * 
 * Features:
 * - User profile card with avatar and membership status
 * - Quick stats (days active, transactions, savings rate)
 * - Account settings (personal info, payment methods, security)
 * - Preferences (notifications, dark mode, language, currency)
 * - Support options (help center, terms, app settings)
 * - Logout functionality
 * 
 * @author FinGuide Development Team
 * @version 1.0.0
 * ============================================================================
 */

import { useState } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Moon,
  Globe,
  Smartphone,
  FileText,
  Settings
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Menu item interface for profile settings
 * Defines the structure for each menu option
 */
interface MenuItem {
  icon: typeof User;     // Lucide icon component
  label: string;         // Display text for the menu item
  description?: string;  // Optional subtitle/description
  action?: "link" | "toggle" | "logout";  // Type of action
  value?: boolean;       // Toggle state for switch items
  id?: string;           // Unique identifier for toggle items
}

/**
 * Menu section interface for grouping related items
 */
interface MenuSection {
  title: string;         // Section header text
  items: MenuItem[];     // Array of menu items in this section
}

// ============================================================================
// MENU CONFIGURATION
// ============================================================================

/**
 * Organized menu sections with their respective items
 * Each section contains related settings and options
 */
const menuSections: MenuSection[] = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", description: "Name, email, phone", action: "link" },
      { icon: CreditCard, label: "Payment Methods", description: "Cards & bank accounts", action: "link" },
      { icon: Shield, label: "Security", description: "Password & 2FA", action: "link" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", description: "Push & email alerts", action: "toggle", value: true, id: "notifications" },
      { icon: Moon, label: "Dark Mode", description: "Switch appearance", action: "toggle", value: false, id: "darkMode" },
      { icon: Globe, label: "Language", description: "English (IN)", action: "link" },
      { icon: Smartphone, label: "Currency", description: "INR (₹)", action: "link" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", action: "link" },
      { icon: FileText, label: "Terms & Privacy", action: "link" },
      { icon: Settings, label: "App Settings", action: "link" },
    ],
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Profile Page Component
 * 
 * Displays user profile information and provides access to various
 * account settings, preferences, and support options.
 * 
 * @returns JSX.Element - The profile page layout
 */
export default function Profile() {
  // State for managing toggle switches
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    notifications: true,
    darkMode: false,
  });

  /**
   * Handles toggle switch changes
   * Updates the toggle state and shows a toast notification
   * 
   * @param id - The identifier of the toggle being changed
   * @param newValue - The new boolean value
   */
  const handleToggleChange = (id: string, newValue: boolean) => {
    setToggleStates(prev => ({ ...prev, [id]: newValue }));
    
    // Show feedback toast
    const label = id === "notifications" ? "Notifications" : "Dark Mode";
    toast.success(`${label} ${newValue ? "enabled" : "disabled"}`);
  };

  /**
   * Handles menu item click actions
   * Shows appropriate feedback based on the action type
   * 
   * @param label - The label of the clicked menu item
   */
  const handleMenuItemClick = (label: string) => {
    toast.info(`${label} - Feature coming soon!`);
  };

  /**
   * Handles the logout action
   * In production, this would clear auth tokens and redirect to login
   */
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    // In production: Clear auth state and redirect to login page
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* ================================================================
            HEADER SECTION
            Simple sticky header with page title
            ================================================================ */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="px-5 py-4">
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </header>

        <div className="space-y-6 px-5 py-6">
          {/* ================================================================
              PROFILE CARD
              Displays user avatar, name, email, and membership status
              ================================================================ */}
          <div className="premium-card relative overflow-hidden animate-scale-in">
            {/* Decorative gradient blur */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-emerald opacity-10 blur-3xl" />
            
            <div className="relative flex items-center gap-4">
              {/* User Avatar with verification badge */}
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-emerald text-white">
                  <span className="text-2xl font-bold">AJ</span>
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold">Alex Johnson</h2>
                <p className="text-sm text-muted-foreground">alex.johnson@email.com</p>
                {/* Premium membership badge */}
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
                  Premium Member
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              USER STATS
              Quick overview of user activity and achievements
              ================================================================ */}
          <div className="grid grid-cols-3 gap-3 animate-slide-up">
            {/* Days Active */}
            <div className="premium-card !p-4 text-center">
              <p className="text-2xl font-bold gradient-text">28</p>
              <p className="text-xs text-muted-foreground">Days Active</p>
            </div>
            
            {/* Total Transactions */}
            <div className="premium-card !p-4 text-center">
              <p className="text-2xl font-bold gradient-text">156</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </div>
            
            {/* Savings Rate */}
            <div className="premium-card !p-4 text-center">
              <p className="text-2xl font-bold gradient-text">18%</p>
              <p className="text-xs text-muted-foreground">Saved</p>
            </div>
          </div>

          {/* ================================================================
              MENU SECTIONS
              Organized list of settings and options
              ================================================================ */}
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              {/* Section Title */}
              <h3 className="px-1 text-sm font-medium text-muted-foreground">
                {section.title}
              </h3>
              
              {/* Section Card with Menu Items */}
              <div className="premium-card !p-0 overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isLast = itemIndex === section.items.length - 1;
                  const toggleId = item.id || "";
                  const isChecked = toggleStates[toggleId] ?? item.value;

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.action === "toggle" && item.id) {
                          handleToggleChange(item.id, !isChecked);
                        } else if (item.action === "link") {
                          handleMenuItemClick(item.label);
                        }
                      }}
                      className={cn(
                        "flex w-full items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/50 animate-fade-in",
                        !isLast && "border-b border-border/50"
                      )}
                      style={{ animationDelay: `${(sectionIndex * 3 + itemIndex) * 0.05}s` }}
                    >
                      {/* Icon Container */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      {/* Label and Description */}
                      <div className="flex-1 text-left">
                        <p className="font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      
                      {/* Action Indicator: Toggle Switch or Chevron */}
                      {item.action === "toggle" ? (
                        <Switch 
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (item.id) {
                              handleToggleChange(item.id, checked);
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ================================================================
              LOGOUT BUTTON
              Prominent button for signing out of the account
              ================================================================ */}
          <button 
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 py-4 font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>

          {/* ================================================================
              APP VERSION FOOTER
              Shows current app version and branding
              ================================================================ */}
          <p className="text-center text-xs text-muted-foreground">
            FinGuide v1.0.0 • Made with ❤️
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
