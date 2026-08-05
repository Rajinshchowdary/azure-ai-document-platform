# Frontend Build — Azure AI Document Intelligence Platform

Build a premium, production-quality React frontend with TypeScript, Vite, and Tailwind CSS. No Azure integration yet — all data is mocked/local.

## Proposed Changes

### 1. Scaffold Vite + React + TypeScript

#### [NEW] `frontend/` (via `create-vite`)

- Run `npx -y create-vite@latest ./frontend --template react-ts --no-interactive`
- Install dependencies: `react-router-dom`, `lucide-react` (icons), `tailwindcss` (v4), `@tailwindcss/vite`

---

### 2. Tailwind CSS v4 Setup

#### [MODIFY] [vite.config.ts](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/vite.config.ts)

- Add `@tailwindcss/vite` plugin

#### [MODIFY] [index.css](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/index.css)

- Replace contents with `@import "tailwindcss"` + custom design tokens (CSS variables for the color palette, fonts, etc.)

---

### 3. Design System & Theme

A dark-mode-first design with a sleek, modern aesthetic:

| Token | Value |
|-------|-------|
| Primary | Indigo-to-violet gradient (`#6366f1` → `#8b5cf6`) |
| Surface | Dark slate (`#0f172a`, `#1e293b`) |
| Accent | Cyan/teal highlights (`#06b6d4`) |
| Text | White / slate-300 |
| Font | Inter (Google Fonts) |

Glassmorphism cards, smooth transitions, micro-animations on hover/focus.

---

### 4. Layout & Routing

#### [NEW] [App.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/App.tsx)

- `BrowserRouter` with routes for all 6 pages
- Public routes: `/login`, `/register`
- Protected routes (simulated): `/dashboard`, `/upload`, `/documents`, `/profile`

#### [NEW] [components/Layout.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/components/Layout.tsx)

- Sidebar navigation (collapsible) with icons
- Top bar with user avatar & notifications bell
- Main content area

---

### 5. Pages (6 total)

#### [NEW] [pages/Login.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/pages/Login.tsx)

- Centered card with email/password fields
- "Sign in with Microsoft" button (non-functional placeholder)
- Link to Register
- Glassmorphism card, animated gradient background

#### [NEW] [pages/Register.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/pages/Register.tsx)

- Full name, email, password, confirm password fields
- Link to Login
- Same aesthetic as Login

#### [NEW] [pages/Dashboard.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/pages/Dashboard.tsx)

- Stats cards (total documents, processed, pending, storage used)
- Recent documents table
- Processing status indicators (mock data)
- Activity chart placeholder

#### [NEW] [pages/Upload.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/pages/Upload.tsx)

- Drag-and-drop zone with file browser fallback
- File type validation (PDF only)
- Upload progress bar (animated, simulated)
- Upload queue with file names & sizes

#### [NEW] [pages/Documents.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/pages/Documents.tsx)

- Searchable, filterable document list
- Grid/list view toggle
- Document cards showing: name, type classification, upload date, status badge
- Click to view results (summary, classification, metadata)

#### [NEW] [pages/Profile.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/pages/Profile.tsx)

- User info display & edit form
- Avatar placeholder
- Account settings section

---

### 6. Shared Components

#### [NEW] Various files in `src/components/`

| Component | Purpose |
|-----------|---------|
| `Sidebar.tsx` | Collapsible nav sidebar with icons |
| `TopBar.tsx` | Header with search, notifications, avatar |
| `StatsCard.tsx` | Dashboard metric cards |
| `DocumentCard.tsx` | Document display card |
| `ProgressBar.tsx` | Animated upload progress bar |
| `FileDropZone.tsx` | Drag-and-drop upload area |
| `StatusBadge.tsx` | Processing status indicators |
| `Modal.tsx` | Reusable modal dialog |
| `Button.tsx` | Styled button variants |
| `Input.tsx` | Styled form input |

---

### 7. Mock Data & Auth Context

#### [NEW] [data/mockData.ts](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/data/mockData.ts)

- Mock documents with realistic data (names, dates, statuses, summaries)
- Mock user profile
- Mock dashboard stats

#### [NEW] [context/AuthContext.tsx](file:///c:/Users/rajin/Desktop/Projects/Azure%20AIML%20Document%20Platform/frontend/src/context/AuthContext.tsx)

- Simple React context for login/logout state (localStorage-based)
- `useAuth()` hook
- Protected route wrapper component

---

## Verification Plan

### Automated Tests
- `npm run build` — Confirm zero TypeScript/build errors

### Manual Verification
- `npm run dev` — Launch dev server, visually verify all 6 pages render correctly with proper styling and navigation
