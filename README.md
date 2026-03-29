# MindMate

MindMate is a student mental health platform built with Next.js and Supabase.

## Features

- Supabase authentication (email/password)
- Role-based access control (`student`, `admin`) via `profiles` table
- AI Companion chat using Gemini API
- Appointment booking workflow backed by Supabase Postgres
- Student dashboard with booking history and statuses
- Admin dashboard with booking approval/rejection
- Mental wellness resource hub and informational pages

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Supabase (Auth + Postgres + RLS)
- Zod validation
- Tailwind CSS + shadcn/ui
- Vitest

## Local Setup

1. Install dependencies:

   npm install

2. Copy and fill environment variables:

   copy .env.example .env

3. Create these Supabase tables and policies in your project:

   - `profiles`: `id uuid primary key`, `name text`, `role text check (role in ('student','admin'))`, `email text`
   - `bookings`: `id uuid primary key default gen_random_uuid()`, `user_id uuid references profiles(id)`, `date date`, `time text`, `notes text`, `status text check (status in ('pending','approved','rejected')) default 'pending'`, `created_at timestamptz default now()`
   - Enable RLS on both tables.
   - Add policies so students can read/write only their own rows and admins can read/update all bookings.

4. Run development server:

   npm run dev

5. Open application:

   http://localhost:3000

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon public key
- `GEMINI_API_KEY`: Gemini API key for AI Companion

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint project
- `npm run test` - run test suite
- `npm run test:watch` - run tests in watch mode

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project into Vercel.
3. Configure environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
4. Deploy.

## Security Notes

- Auth is handled by Supabase Auth.
- Data protection should be enforced with Supabase RLS policies.
- Booking and user access are role-aware through profile checks and table policies.

## Test Coverage

Included tests cover role utility behavior and can be expanded for Supabase-integrated flows.
