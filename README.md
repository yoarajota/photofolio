# Photopholio

## Overview

This project is a web application built with **Next.js** and **Supabase**, providing an authentication system with **OTP (One-Time Password)**. It also incorporates **Motion** for animations, **ShadCN** for components, and **Three.js** for 3D rendering.

## Features

- **Landing Page**: A public-facing landing page that provides basic information about the photographer.
- **Admin Section**: A secure, admin-only section his jobs, and settings.
- **Photographer Job Routes**: Using dynamic routes, the phorographer can promote his work and sell photos.

## Tech Stack

- **Frontend**:
  - Next.js
  - **Motion** (for animations)
  - **ShadCN** (for UI components)
  - **Three.js** (for 3D rendering and interactive visuals)
- **Backend**:
  - Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: OTP-based authentication using Supabase Auth
- **Styling**:
  - TailwindCSS

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Supabase account

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/project-name.git
   cd project-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Supabase:

   - Create a Supabase project [here](https://supabase.io/).
   - Create the necessary database tables, authentication settings, and storage configurations.
   - Update `.env.local` with your Supabase credentials.

   Example `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be running on [http://localhost:3000](http://localhost:3000).

## Authentication (OTP)

This project uses OTP-based authentication with **Supabase Auth**. Users will receive a one-time password via email to log in.

### How it works:

- Users provide their email on the login page.
- Supabase sends an OTP to the user's email.
- The user enters the OTP to authenticate and access their dashboard or admin section.

## Features

### 1. **Landing Page**

The landing page is the first point of contact for users. It includes animations powered by **Motion** and **Three.JS** to create an engaging user experience.

### 2. **Admin Section**

Only authorized users can access the admin section, which includes:

- Managing photographer job rotues and his photos.
- Viewing analytics or other admin-level settings

### 3. **Photographer Job Paths**

Photographers can manage their assigned jobs. The photographer can protect the images with customizables watermarks.

### 4. **Dynamic Routing for Jobs**

This project uses **Next.js dynamic routes** to handle job-related pages efficiently. Each job is assigned a unique identifier, allowing the application to generate dynamic URLs such as:

```plaintext
/[custom_job_name]

example:
localhost:3000/lolo-photos
```

Using Next.js dynamic routing, the photographer customer can access job details based on the job name in the URL. The application can use:
This routing approach ensures efficient data fetching and enhances the user experience by dynamically rendering job pages based on real-time data from Supabase.
