# MAKAI — MVP Product Brief

**Version:** 1.0 | **Date:** March 2026 | **Classification:** Confidential
**Domain:** makai.agency | **Stage:** MVP — Built & Deployed

---

## What is MAKAI?

**MAKAI is an AI-powered agency operating system** — a Progressive Web Application (PWA) built for small and medium integrated marketing and creative agencies in Puerto Rico and LATAM.

It is not a generic project manager. It is the operating brain of an agency — combining campaign workflow, AI-assisted creative strategy, client intelligence, and compliance governance into a single, unified platform.

> *"Every output, workflow, and AI interaction must reinforce the idea that a brand is a living entity — a single, unified soul across all touchpoints."*

---

## The Problem It Solves

Puerto Rican and LATAM marketing agencies operate across fragmented tools — briefs in Google Docs, jobs tracked in spreadsheets, files scattered in shared drives, AI used without guardrails, compliance managed informally or not at all.

MAKAI replaces all of that with one platform that:

- Keeps every campaign, client, job, and asset connected
- Enforces strategic thinking before any creative is produced
- Logs every AI interaction with version control and validation scores
- Manages governance, policies, and compliance at a platform level

---

## Platform Philosophy — One Soul System

Every brand is a living entity with a soul. MAKAI's core philosophy, called the **One Soul System**, ensures that every output — from a brief to a social post — is connected to the brand's voice, human truth, and strategic direction.

### The 4 Mandatory AI Questions

Before any AI generates creative, strategic, or media output, these 4 questions must be answered and stored:

| # | Question | Purpose |
|---|---|---|
| 1 | **Human Tension** | What is the unresolved human truth this brand must address? |
| 2 | **Strategic Objective** | What specific behavior or belief must change? |
| 3 | **Ecosystem Role** | How does this idea serve the broader brand ecosystem? |
| 4 | **Channel Integration** | How does this idea live and breathe across all channels? |

These 4 questions are embedded in every campaign creation flow and every AI prompt.

### Creative Hook

The **Creative Hook** is MAKAI's standard for evaluating ideas. Every concept must:

- Cause a violent rupture in distraction
- Connect to a survival-level human truth
- Be unpredictable yet deeply relevant
- Carry surprise that makes people stop, feel, and act

Every campaign carries a **Creative Hook Score (0–10)** logged against every AI output.

---

## Who It's For

**Primary market:** Small to medium integrated marketing and creative agencies in Puerto Rico and LATAM.

**Business Model:** Multi-tenant SaaS — each agency subscribes and gets their own fully isolated Workspace.

---

## Department Coverage

| Department | What MAKAI Does For Them |
|---|---|
| **Account Executives** | Own campaigns, manage client profiles, track job status, generate estimates |
| **Creative** | Manage creative jobs, upload assets, score creative hooks, run AI-assisted ideation |
| **Strategy & Digital** | Create and validate briefs, run strategy jobs, manage social/digital outputs |
| **Production** | Track video production from Concept to Delivered with a full stage pipeline |
| **IT** | Manage platform governance, AI agent config, policies, and audit logs |
| **Owner/Admin** | Configure the agency Soul, manage all users, access all compliance and billing |

---

## User Roles

| Role | Access |
|---|---|
| Owner / Admin | Full platform — Soul config, billing, governance |
| Directors | All modules, read-write, approve outputs |
| Account Executives | Client profiles, campaigns, AI summaries |
| Strategy & Digital | Briefs, strategy jobs, knowledge hub |
| Creative | Creative jobs, assets, AI ideation |
| IT | Policies, audit logs, AI agent config |

---

## Core Data Architecture

```
Workspace (Agency Tenant)
└── Client
    └── Brand Profile (tone, audience, legal, competitive)
        └── Campaign
            ├── Brief (4 mandatory questions + validation score)
            ├── Creative Jobs (by department)
            ├── Strategy Jobs
            ├── Video Production (stage pipeline)
            ├── Assets
            ├── Estimate Job + Line Items
            └── AI Log (every prompt, output, hook score, validation)
```

---

## MVP Entities (Data Model — Built)

| Entity | Purpose |
|---|---|
| `Client` | Brand profiles — tone, audience, legal, competitive landscape |
| `Campaign` | Core hub — links all work, holds the 4 questions |
| `Brief` | Strategic brief with validation score |
| `CreativeJob` | Jobs by department (Creative, Strategy, Digital, Production) |
| `EstimateJob` | Client-facing cost estimates |
| `EstimateLineItem` | Line items per estimate |
| `VideoProduction` | Full video pipeline (Concept → Delivered) |
| `Asset` | Files and deliverables linked to campaigns |
| `AILog` | Every AI interaction — prompt, output, hook score, flag status |
| `Policy` | Agency policies with version control |
| `PolicyAcceptance` | Per-user acceptance records with timestamps |
| `AuditLog` | Full activity trail — user, action, module, campaign, PII/PHI flags |

---

## MVP Pages (Built & Deployed)

### Dashboard

- Agency-wide stats: active campaigns, active clients, jobs in progress, pending estimates
- Recent campaigns list with status and client
- Active jobs feed with department and priority
- Client roster preview

### Clients

- Full client management — create, edit, delete
- Brand profiles: tone of voice, target audience (demo + psychographic), competitive landscape, legal constraints, no-go topics
- Status: Active / Inactive / Prospect
- Card layout with color-coded accent per client

### Campaigns

- Full campaign list with status filter pills (Draft / Active / On Hold / Complete / Closed)
- Campaign creation with the **4 Mandatory AI Questions** embedded
- Creative Hook Score display
- Click-through to Campaign Detail

### Campaign Detail (4-Tab Hub)

The central work hub of the platform. Every campaign has 4 tabs:

**Creative Tab**

- Creative Jobs list (title, assignee, due date, priority, status)
- Estimate Job with full line item table and totals

**Strategy Tab**

- Strategy & Digital jobs
- Briefs with validation scores

**Production Tab**

- Video Productions with visual stage pipeline (Concept → Scripted → Pre-Production → In Production → Post-Production → Review → Approved → Delivered)
- Production Jobs

**Log & History Tab**

- Full AI interaction log
- Per-entry: module, department, prompt, output, hook score, validation status, flagged status, timestamp

### Governance

- Policy Engine: create, publish, archive policies with version control
- Policy types: AI Use, Acceptable Use, Data Privacy, Client Confidentiality, IP & Ownership, Third-Party Integration
- Mandatory vs. informational policy toggle
- Re-acceptance requirement toggle
- Acceptance Log: user, policy, version, timestamp, IP address
- Archived policies view

---

## Compliance & SIEM Layer (Designed — Partial Build)

MAKAI includes a lightweight SIEM (Security Information and Event Management) layer:

- **Audit Log** — full user activity trail (who, what, when, which campaign)
- **PII Detection** — automatic flagging of Personally Identifiable Information in AI inputs/outputs
- **PHI Detection** — automatic detection and blocking of Protected Health Information
- **Client Data Protection** — prevents cross-workspace data leakage
- **Data Retention Policies** — configurable per data type
- **Incident Alerts** — automated alerts for policy violations or suspicious behavior

---

## AI Layer (Designed — Foundation Built)

| Component | Status |
|---|---|
| Contextual AI calls scoped to Workspace > Client > Campaign | Designed |
| AI Log entity with hook score + validation tracking | Built |
| Brief Validator Bot | Designed |
| Creative Hook Checker | Designed |
| Workflow Compliance Agent | Designed |
| Security & Data Protection Agent | Designed |
| Per-client custom AI agents (trained on brand guidelines) | Designed |
| Prompt library with version control | Designed |

---

## Technical Stack

| Layer | Tech |
|---|---|
| Frontend | React (TypeScript) — PWA |
| Styling | Tailwind CSS v4 + Google Material Icons + Inter font |
| State Management | Zustand with persist middleware |
| Build | Vite |
| PWA | vite-plugin-pwa |
| Auth | OAuth / SSO (planned) |
| Domain | makai.agency |

---

## Design Language

Inspired by modern SaaS dashboards (Matoxi design system):

- White background with light gray canvas
- Icon-only 64px left sidebar with tooltips
- Fixed top bar with breadcrumb, search, and notifications
- White cards with subtle drop shadows
- Google Material Icons throughout
- Inter typeface
- Violet/fuchsia primary brand color
- Soft status pill badges (no harsh colors)
- Clean modals with structured form layouts

---

## What's Been Built (MVP Scope)

- Full data model (12 entities)
- Dashboard with live agency stats
- Client management (full CRUD + brand profiles)
- Campaign management (full CRUD + status filters)
- Campaign Detail hub (4 tabs — Creative, Strategy, Production, Log & History)
- Video Production pipeline with visual stage tracker
- Estimate Jobs with line items
- Governance & Policy Engine (create, publish, archive, version control, acceptance log)
- AI Log entity (hooks, validation, flagging)
- Design system (sidebar, top bar, cards, modals, badges)

---

## What's Next (Post-MVP Roadmap)

| Feature | Priority |
|---|---|
| Soul Settings Page (agency configuration, AI guardrails) | High |
| Compliance / SIEM Dashboard (PII/PHI monitoring, audit logs UI) | High |
| User Management & RBAC UI | High |
| Brief creation with AI validation | High |
| AI-assisted ideation in Campaign Detail | High |
| Creative Hook scoring engine | Medium |
| Per-client AI agent configuration | Medium |
| Prompt library management | Medium |
| Subscription tiers & billing | Medium |
| Microsoft 365 SSO | Medium |
| Slack / Meta / Google integrations | Low |
| Mobile PWA optimization | Low |

---

## Positioning

> MAKAI is not a tool. It is the soul of your agency — the system that makes sure every brief is strategic, every creative is human, every output is on-brand, every action is compliant, and every team member is working from the same intelligence.

**For agencies tired of managing chaos across 12 different tools — MAKAI is the one.**

---

*MAKAI — One Soul System | makai.agency | &copy; 2026 — Confidential*
