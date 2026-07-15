# 🏡 EstateHub

A production-ready, full-stack real estate platform built with **TypeScript** end-to-end — from the database layer to the UI. Users can browse, search, and filter property listings, manage their own listings, leave reviews, and admins get a full dashboard to manage users and properties platform-wide.

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Demo Credentials](#-demo-credentials)
- [Folder Structure](#-folder-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌟 Overview

**EstateHub** is a full-stack property listing platform designed with clean architecture and real-world engineering practices in mind. It's split into two independently deployable services:

- **Client** — a Next.js 15 (App Router) frontend handling all user-facing pages, authentication UI, and the role-based dashboard.
- **Server** — a standalone Express.js + MongoDB REST API handling data, authentication verification, and business logic.

Authentication is powered by [better-auth](https://www.better-auth.com/), bridged to the Express backend via JWT (JWKS-verified), enabling secure cross-origin communication between the two services.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Email/password authentication via **better-auth**
- Role-based access control (`user` / `admin`)
- Route protection via Next.js `proxy.ts` (server-side session verification)
- Secure cross-service auth using JWT + JWKS (no shared secrets)

### 🏠 Property Listings
- Browse, search, filter (category, location, price range), and sort listings
- Paginated grid view with skeleton loading states
- Detailed property pages with image, specs, and full description
- Add / manage / delete listings (protected, owner-only)

### ⭐ Reviews
- Star-rating reviews on property details pages
- Users can delete their own reviews
- Featured reviews carousel on the homepage

### 🛠️ Admin Dashboard
- Platform-wide statistics (total users, total listings, category breakdown)
- Manage all property listings (any owner)
- Manage users — promote to admin, delete accounts

### 🎨 UI/UX
- Fully responsive across mobile, tablet, and desktop
- Light/dark mode via CSS custom properties
- Smooth micro-interactions with **Framer Motion**
- Built with **HeroUI** components and **Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, HeroUI |
| **Animation** | Framer Motion |
| **Icons** | React Icons |
| **Backend Framework** | Express.js |
| **Database** | MongoDB (native driver) |
| **Authentication** | better-auth (JWT + JWKS bridge to Express) |
| **Charts** | Recharts |

---

## 🏗️ Project Architecture

```
┌─────────────────────┐         JWT (Bearer)          ┌──────────────────────┐
│   Next.js Client     │ ─────────────────────────────▶│   Express Server      │
│   (App Router)       │◀───────────────────────────── │   (REST API)          │
│                       │         JSON Response         │                       │
│  • Server Components  │                                │  • config/            │
│  • Client Components  │                                │  • middlewares/       │
│  • better-auth client │         JWKS verification      │  • routes/            │
└──────────┬────────────┘ ──────────────────────────────▶│  • controllers/       │
           │                                              └──────────┬────────────┘
           │ Session (cookie)                                        │
           ▼                                                         ▼
   ┌───────────────┐                                         ┌───────────────┐
   │  better-auth   │                                         │   MongoDB      │
   │  (session DB)  │                                         │  (properties,  │
   └───────────────┘                                          │  reviews, etc) │
                                                                └───────────────┘
```

The Express backend verifies incoming requests using **JWKS** (JSON Web Key Set) exposed by better-auth's JWT plugin — no shared secret is stored on the backend, keeping the two services securely decoupled.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB connection string (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/estatehub.git
cd estatehub
```

### 2. Install dependencies

```bash
# Client
cd real-estate-client
npm install

# Server
cd ../real-estate-server
npm install
```

### 3. Set up environment variables

See [Environment Variables](#-environment-variables) below, then create `.env` (server) and `.env.local` (client) files accordingly.

### 4. Run the development servers

```bash
# Terminal 1 — Server
cd real-estate-server
npm run dev

# Terminal 2 — Client
cd real-estate-client
npm run dev
```

The client runs on `http://localhost:3000` and the server on `http://localhost:5000` by default.

---

## 🔑 Environment Variables

### `real-estate-server/.env`

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
DATA_BASE_NAME=estatehub
CLIENT_URL=http://localhost:3000
```

### `real-estate-client/.env.local`

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URI=your_mongodb_connection_string
DATA_BASE_NAME=estatehub
```

> ⚠️ Never commit `.env` files. Both are already excluded via `.gitignore`.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Properties

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/properties` | Public | List properties — search, filter, sort, paginate |
| `GET` | `/properties/:id` | Public | Get a single property |
| `GET` | `/properties/my-properties` | Protected | Get the logged-in user's listings |
| `POST` | `/properties` | Protected | Create a new listing |
| `PATCH` | `/properties/:id` | Protected | Update a listing (owner/admin) |
| `DELETE` | `/properties/:id` | Protected | Delete a listing (owner/admin) |

### Reviews

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/reviews/featured` | Public | Recent, highly-rated reviews (homepage) |
| `GET` | `/reviews/:propertyId` | Public | All reviews for a property |
| `POST` | `/reviews` | Protected | Submit a review |
| `DELETE` | `/reviews/:id` | Protected | Delete your own review |

### Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/admin/users` | Admin only | List all users |
| `PATCH` | `/admin/users/:id` | Admin only | Update a user's role |
| `DELETE` | `/admin/users/:id` | Admin only | Delete a user |
| `GET` | `/admin/properties` | Admin only | List all properties (platform-wide) |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| User | `user@estatehub.demo` | `Demo@1234` |
| Admin | `admin@estatehub.demo` | `Demo@1234` |

---

## 📂 Folder Structure

```
estatehub/
├── real-estate-client/          # Next.js frontend
│   └── src/
│       ├── app/                 # App Router pages
│       ├── components/          # UI components
│       └── lib/
│           ├── actions/         # Server-side data fetching
│           ├── api/             # Client-side API calls
│           └── auth.ts          # better-auth server instance
│
└── real-estate-server/          # Express backend
    └── src/
        ├── config/              # DB connection
        ├── middlewares/         # Auth verification
        ├── routes/              # Route definitions
        ├── controllers/         # Business logic
        └── types/               # Shared TypeScript types
```

---

## 🗺️ Roadmap

- [ ] Property image uploads (currently URL-based)
- [ ] Saved/favorited listings
- [ ] Email notifications for new listings matching saved search criteria
- [ ] In-app messaging between buyers and listing owners

---

## 📄 License

This project was built as part of an academic assignment and is available for educational reference.

---

<p align="center">Built with ❤️ using TypeScript</p>