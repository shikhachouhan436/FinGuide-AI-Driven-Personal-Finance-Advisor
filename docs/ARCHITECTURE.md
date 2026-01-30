# FinGuide Architecture Documentation

## Overview

FinGuide is built as a modern single-page application (SPA) with a focus on mobile-first design, performance, and scalability. This document outlines the architectural decisions and patterns used in the application.

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │  Components │  │   UI Components     │  │
│  │  (Routes)   │  │ (Features)  │  │    (Shadcn/UI)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                        │
│  ┌─────────────────────┐  ┌───────────────────────────────┐ │
│  │   React Query       │  │   Local State (useState)      │ │
│  │   (Server State)    │  │   (Component State)           │ │
│  └─────────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER (Future)                     │
│  ┌─────────────────────┐  ┌───────────────────────────────┐ │
│  │   REST API          │  │   Supabase / MongoDB          │ │
│  │   (Express.js)      │  │   (Database)                  │ │
│  └─────────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Component Categories

1. **Layout Components** (`src/components/layout/`)
   - `AppLayout.tsx` - Main app wrapper with navigation
   - `BottomNav.tsx` - Mobile bottom navigation

2. **Feature Components** (`src/components/dashboard/`)
   - Domain-specific components for dashboard features
   - Self-contained with their own logic

3. **UI Components** (`src/components/ui/`)
   - Reusable, unstyled components from Shadcn/UI
   - Extended with custom variants

### Component Design Principles

```tsx
// ✅ Good: Small, focused component
export function BalanceCard({ balance, income, expenses }: BalanceCardProps) {
  // Single responsibility: Display balance info
}

// ✅ Good: Composition over inheritance
export function Dashboard() {
  return (
    <AppLayout>
      <BalanceCard />
      <QuickActions />
      <TransactionList />
    </AppLayout>
  );
}
```

## Styling Architecture

### Design Token System

All design tokens are defined in `src/index.css`:

```css
:root {
  /* Colors */
  --primary: 220 50% 15%;
  --accent: 160 84% 39%;
  
  /* Gradients */
  --gradient-emerald: linear-gradient(135deg, ...);
  
  /* Shadows */
  --shadow-card: 0 4px 24px -6px rgba(...);
}
```

### Tailwind Configuration

Extended in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },
};
```

### CSS Classes Hierarchy

```
┌─────────────────────────────────────────┐
│  Utility Classes (Tailwind)             │
│  @apply px-4 py-2 rounded-xl            │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Component Classes (index.css)          │
│  .premium-card, .glass-card             │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Design Tokens (CSS Variables)          │
│  --primary, --shadow-card               │
└─────────────────────────────────────────┘
```

## Routing Structure

```typescript
const routes = [
  { path: "/", element: <Index /> },           // Dashboard
  { path: "/analytics", element: <Analytics /> },
  { path: "/add", element: <AddTransaction /> },
  { path: "/budget", element: <Budget /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <NotFound /> },
];
```

## Data Flow

### Current (Mock Data)
```
Component → Mock Data (hardcoded) → Render
```

### Future (With Backend)
```
Component → React Query → API → Database
     ↑                           │
     └───────── Cache ───────────┘
```

## Animation System

### Keyframe Animations
- `slide-up` - Entry animation for cards
- `scale-in` - Popup/modal animations
- `fade-in` - General fade transitions

### Stagger Pattern
```tsx
<div className="animate-slide-up stagger-1">First</div>
<div className="animate-slide-up stagger-2">Second</div>
<div className="animate-slide-up stagger-3">Third</div>
```

## Performance Considerations

1. **Code Splitting** - Each page is a separate chunk
2. **Lazy Loading** - Images and heavy components (planned)
3. **Memoization** - Expensive calculations cached
4. **Virtual Lists** - For long transaction lists (planned)

## Security Architecture (Planned)

```
┌──────────────────────────────────────────┐
│                 CLIENT                    │
│  ┌────────────────────────────────────┐  │
│  │  JWT Token Storage (httpOnly)      │  │
│  │  Input Validation (Zod)            │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│                 SERVER                    │
│  ┌────────────────────────────────────┐  │
│  │  JWT Verification                  │  │
│  │  Rate Limiting                     │  │
│  │  bcrypt Password Hashing           │  │
│  │  CORS Configuration                │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│               DATABASE                    │
│  ┌────────────────────────────────────┐  │
│  │  Row Level Security (RLS)          │  │
│  │  Encrypted Fields                  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BalanceCard.tsx` |
| Pages | PascalCase | `Analytics.tsx` |
| Utilities | camelCase | `formatCurrency.ts` |
| Hooks | camelCase with 'use' | `useTransactions.ts` |
| Types | PascalCase | `Transaction.ts` |

## Testing Strategy (Planned)

1. **Unit Tests** - Component logic, utilities
2. **Integration Tests** - Page flows, API integration
3. **E2E Tests** - Critical user journeys

---

For more details, see the main [README.md](../README.md).
