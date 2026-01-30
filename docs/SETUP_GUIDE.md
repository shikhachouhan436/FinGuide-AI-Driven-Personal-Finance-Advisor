# FinGuide Setup Guide

This guide will walk you through setting up FinGuide for local development and deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Development Setup](#development-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Building for Production](#building-for-production)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Installation |
|-------------|---------|--------------|
| Node.js | 18.0+ | [nodejs.org](https://nodejs.org) |
| npm/yarn/bun | Latest | Comes with Node.js |
| Git | 2.0+ | [git-scm.com](https://git-scm.com) |

### Verify Installation

```bash
# Check Node.js version
node --version  # Should output v18.x.x or higher

# Check npm version
npm --version   # Should output 9.x.x or higher

# Check Git version
git --version   # Should output 2.x.x
```

---

## Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd finguide

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173
```

---

## Development Setup

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd finguide
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using bun:
```bash
bun install
```

### Step 3: Verify Setup

```bash
# Run type checking
npm run typecheck

# Run linter
npm run lint

# Run tests (if available)
npm run test
```

---

## Environment Configuration

### Current Configuration

FinGuide currently uses mock data and doesn't require environment variables for basic functionality.

### Future Configuration (Backend Integration)

When backend is integrated, create a `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Feature Flags
VITE_ENABLE_AI=true
VITE_ENABLE_ANALYTICS=true
```

### Environment Files

| File | Purpose |
|------|---------|
| `.env` | Default environment variables |
| `.env.local` | Local overrides (not committed) |
| `.env.production` | Production variables |

---

## Running the Application

### Development Mode

```bash
npm run dev
```

This will:
- Start Vite dev server on `http://localhost:5173`
- Enable hot module replacement (HMR)
- Show detailed error messages

### Preview Production Build

```bash
npm run build
npm run preview
```

---

## Building for Production

### Build Command

```bash
npm run build
```

### Build Output

The build creates optimized files in the `dist/` folder:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── favicon.ico
```

### Build Configuration

Vite configuration is in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

## Deployment

### Option 1: Lovable Deploy

Click "Publish" in the Lovable editor to deploy instantly.

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 4: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t finguide .
docker run -p 8080:80 finguide
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Error: Port 5173 is already in use

# Solution 1: Kill the process
lsof -ti:5173 | xargs kill -9

# Solution 2: Use different port
npm run dev -- --port 3000
```

#### 2. Module Not Found

```bash
# Error: Cannot find module '@/components/...'

# Solution: Check path aliases in tsconfig.json and vite.config.ts
```

#### 3. TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run typecheck
```

#### 4. Styling Issues

```bash
# Rebuild Tailwind CSS
npm run build:css  # if available
# or restart dev server
```

### Getting Help

1. Check the [Architecture Guide](./ARCHITECTURE.md)
2. Search existing issues on GitHub
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details

---

## Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start dev server |
| `build` | `npm run build` | Production build |
| `preview` | `npm run preview` | Preview build |
| `lint` | `npm run lint` | Run ESLint |
| `typecheck` | `npm run typecheck` | TypeScript check |

---

## Next Steps

After setup, you can:

1. **Explore the codebase** - Start with `src/pages/Index.tsx`
2. **Modify the design** - Edit `src/index.css` for design tokens
3. **Add features** - Create new components in `src/components/`
4. **Connect backend** - Follow the backend integration guide (coming soon)

---

For more information, see the main [README.md](../README.md).
