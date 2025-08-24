# Waternity — Transparent Water Sales on Hedera

Waternity is a Next.js application that demonstrates transparent, on-chain water sales and settlement using the Hedera network. It showcases how deposits, metered water usage, tariff updates, revenue settlements, refunds, investor claims, and public audits can be modeled with verifiable proofs via Hedera Token Service (HTS) and Hedera Consensus Service (HCS).

Note: This project uses mock data for wells, transactions, and proofs. It is production-ready in structure but intended for demonstrations and rapid prototyping.

## Highlights
- End-to-end UX for users, operators, investors, and auditors
- Verifiable ProofPills that open HashScan (HTS) or Mirror Node (HCS)
- Clean componentized UI with Tailwind CSS and Radix primitives
- Type-safe utilities and mock domain models for quick iteration

## Tech Stack
- Framework: Next.js (App Router)
- UI: React 19, Tailwind CSS v4, Radix UI, Lucide Icons
- State/Data: @tanstack/react-query, Zustand, Zod
- Web3: @hashgraph/sdk, ethers v6
- Testing: Vitest + React Testing Library (JSDOM)
- Lint/Format: ESLint, Prettier

## Getting Started
1) Install dependencies:
- npm install

2) Run the dev server:
- npm run dev
- Or on port 3002: npm run dev:3002

3) Open the app:
- http://localhost:3000

Build and run a production build:
- npm run build && npm start

## Available Scripts
- dev: Start Next.js dev server
- dev:3002: Dev server on port 3002
- build: Build production bundle
- start: Start production server
- lint / lint:fix: Lint project (and fix)
- format / format:check: Prettier formatting
- type-check: TypeScript type check
- test / test:ui / test:run: Vitest (watch, UI, or CI)
- prepare: Format, lint:fix, and type-check

## Project Structure
- src/app: App Router pages (landing, dashboard routes, etc.)
- src/components: Reusable UI and feature components
- src/components/dashboard: Feature dashboards (user, operator, investor, admin, audit, ledger, marketplace)
- src/components/landing: Landing sections (hero, product, how-it-works, etc.)
- src/components/ui: Design system primitives (buttons, cards, inputs, ProofPill, etc.)
- src/lib: Mock data and utilities
- src/test: Test setup
- public: Static assets

## Core Features
- Landing Experience: Hero, problem/solution, product highlights, “How It Works,” live wells, and value proposition sections that explain the flow from deposit to public audit.
- User Buy Water: Simulated deposit, purchase by liters, refund flow, session tracking, and printable receipts with proof tags.
- Operator Tariff & Device: Tariff manager, device health and metrics, alerts, and withdrawals.
- Investor Portfolio & Claims: Portfolio KPIs, cashflow eligibility, claim workflow, settlement tracking.
- Public Audit Trail: Read-only explorer of HCS stream messages, HTS transfers, and reconciliation metrics.
- Well Ledger: Detailed per-well view including overview, timeline, settlements, reconciliation, and documents.
- Explore Marketplace: Browse Cashflow vs Impact wells and drill into ledger details.

## Data Model (Mock)
- src/lib/mock-data.ts defines Well and Transaction interfaces along with helper selectors such as getWellById, getWellsByType, getTransactionsByWellId, getActiveWells, and getTotalStats. Proof IDs (HCS/HTS) are included for each well to demonstrate verifiability.

## Styling & Theming
- Tailwind CSS v4 with class-based dark mode and an extended Waternity brand palette. Inter is the base font. Animations and radii are customized in tailwind.config.ts.

## Proofs UX
- ProofPill component renders compact, copy-friendly proof badges. Clicking opens an external explorer:
  - HTS: HashScan transaction view
  - HCS: Mirror Node topic message view

## Testing
- Vitest configured with JSDOM and React Testing Library. A global setup file is provided at src/test/setup.tsx.
- Run tests: npm run test
- Interactive UI: npm run test:ui

## Linting & Formatting
- ESLint (Next.js config) and Prettier are set up. Run npm run lint and npm run format to enforce code quality.

## Deployment
- The app is a standard Next.js application and can be deployed to any Next-compatible environment (e.g., Vercel, Node server). Use npm run build then npm start.

## Environment & Security
- No environment variables or secrets are required to run this demo. All blockchain interactions are simulated via mock data. When wiring to real networks, never commit keys and always use server-side secret management.

## Roadmap Ideas
- Connect to live Hedera Mirror Node APIs and topic subscriptions
- Wallet integration and real HTS token flows
- Server APIs for device ingestion and settlement jobs
- Role-based auth and granular permissions
- Persisted data layer and analytics

## Acknowledgements
- Built on Next.js, Tailwind CSS, Radix UI, and the Hedera ecosystem tooling.
