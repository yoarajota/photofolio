# Photofolio

Photography portfolio web application with interactive 3D visuals, built with Next.js and Supabase.

> **Status:** In development. Core landing page and auth are functional; admin dashboard and photo management are being built.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Auth:** OTP-based authentication via Supabase
- **3D:** Three.js (interactive city model)
- **Animations:** Motion (Framer Motion)
- **UI:** shadcn/ui + TailwindCSS

## Features

- Landing page with animated 3D hero section
- Portfolio gallery with category tabs
- Services section with pricing
- About section with photographer bio
- Client testimonials
- Contact form
- Instagram feed grid
- OTP authentication
- Protected admin routes for photo management (WIP)

## Getting Started

```bash
cp .env.example .env.local
# Fill in Supabase credentials
npm install
npm run dev
```

## Roadmap

- [ ] Admin dashboard for managing photos
- [ ] Photography job/session routes
- [ ] Photo e-commerce integration
- [ ] Dark mode support