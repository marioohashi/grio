# Griô 🏺✨

> _Preserve what time takes away._

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://next.js.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Docker-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**Griô** is a collaborative, private, and public digital vault designed for life’s most meaningful chapters. Free from algorithmic noise, advertisements, and social media clutter, Griô empowers individuals and groups to curate, structure, and preserve personal milestones, overland expeditions, creative portfolios, and family legacies with absolute ownership.

---

## 🚀 Core Features

- **Collaborative Timelines:** Multi-member access control (`OWNER`, `EDITOR`, `VIEWER`) across shared or private life events.
- **Chronicles & Memories Feed:** Rich chronological entries featuring dates, custom moods, rich-text descriptions, tags, and media gallery support.
- **Zero Algorithmic Noise:** Pure chronological data presentation focused purely on personal storytelling and data longevity.
- **Robust Data Validation:** End-to-end type safety powered by TypeScript and runtime validation via Zod.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://next.js.org/) (App Router & Server Actions)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) (running locally via Docker) + [Prisma ORM v5](https://www.prisma.io/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with a custom earthy dark-mode design system (`stone` & `amber`)
- **Validation:** [Zod](https://zod.dev/)

---

## 📂 Project Architecture

```tree
grio/
├── prisma/
│   ├── schema.prisma       # Relational database models (User, Timeline, Member, Memory)
│   ├── migrations/         # Database migration history
│   └── seed.ts             # Initial database seeder with sample expeditions & memories
├── src/
│   ├── app/
│   │   ├── actions/        # Server Actions for type-safe data mutations (user onboarding, etc.)
│   │   ├── globals.css     # Global Tailwind styles & custom scrollbars
│   │   ├── layout.tsx      # Root layout configuration
│   │   └── page.tsx        # Dynamic Server-Side Rendered dashboard & timelines feed
│   └── lib/
│       └── prisma.ts       # Global Prisma Client singleton configuration
├── package.json
└── next.config.ts
```

## 🗄️ Database Schema Overview

The database relies on a robust relational structure optimized for flexible access control and chronological data:

- User: Manages profile identities and credentials.
- Timeline: Core container representing a life chapter, project, or expedition (categorized by type and visibility).
- TimelineMember: Junction table handling role-based access control between users and timelines.
- Memory: Granular event logs tied to a timeline, featuring timestamps, moods, tags, and media arrays.
