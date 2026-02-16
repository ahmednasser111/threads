# 🧵 Threads — Full-Stack Social Media App

A feature-rich, full-stack social media application inspired by **Meta's Threads**, built with **Next.js 15**, **MongoDB**, **Clerk Authentication**, and **UploadThing**. Users can create threads, reply, like, repost, search for other users, join communities, and more — all wrapped in a sleek dark-themed UI.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

- **🔐 Authentication** — Secure sign-up, sign-in, and onboarding flow powered by [Clerk](https://clerk.com) with a dark theme.
- **📝 Create Threads** — Share your thoughts by creating new threads with rich text input.
- **💬 Nested Replies** — Comment on threads and engage in nested, threaded conversations.
- **❤️ Like Threads** — Like and unlike threads with real-time feedback.
- **🔁 Repost Threads** — Repost threads to amplify content you enjoy.
- **🔗 Share Threads** — Share threads via a convenient share button.
- **🗑️ Delete Threads** — Remove your own threads with a confirmation modal.
- **🔍 Search Users** — Discover other users on the platform with the search bar.
- **👤 User Profiles** — View user profiles with profile headers, bio, and tabbed content (Threads, Replies, Tagged).
- **🏘️ Communities** — Browse and join communities with dedicated community pages and member listings.
- **📸 Image Uploads** — Upload profile images via [UploadThing](https://uploadthing.com).
- **📄 Pagination** — Paginated feeds for smooth browsing through threads.
- **📱 Responsive Design** — Fully responsive layout with a top bar, left sidebar, right sidebar, and mobile bottom bar.
- **🔔 Activity Feed** — Stay updated with an activity page for notifications.
- **🌐 Webhooks** — Real-time data sync with Clerk via webhook integration (Svix).
- **🎨 Dark Theme** — Beautiful dark-mode interface throughout the entire application.

---

## 🛠️ Tech Stack

| Category           | Technology                                                                 |
| ------------------ | -------------------------------------------------------------------------- |
| **Framework**      | [Next.js 15](https://nextjs.org/) (App Router)                            |
| **Language**       | [TypeScript 5](https://www.typescriptlang.org/)                            |
| **UI Library**     | [React 19](https://react.dev/)                                             |
| **Styling**        | [Tailwind CSS 4](https://tailwindcss.com/) + `tailwindcss-animate`         |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`, `@clerk/themes`)             |
| **Database**       | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) |
| **File Uploads**   | [UploadThing](https://uploadthing.com/)                                    |
| **Forms**          | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **UI Components**  | [Radix UI](https://www.radix-ui.com/) (Tabs, Label, Slot)                 |
| **Icons**          | [Lucide React](https://lucide.dev/)                                        |
| **Notifications**  | [Sonner](https://sonner.emilkowal.dev/) (Toast notifications)              |
| **Webhooks**       | [Svix](https://www.svix.com/)                                              |
| **Font**           | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)            |

---

## 📁 Project Structure

```
threads/
├── app/
│   ├── (auth)/                  # Authentication pages
│   │   ├── layout.tsx           # Auth layout with dark Clerk theme
│   │   ├── sign-in/             # Sign-in page
│   │   ├── sign-up/             # Sign-up page
│   │   └── onboarding/          # User onboarding flow
│   ├── (root)/                  # Main application pages
│   │   ├── layout.tsx           # Root layout (Topbar, Sidebars, Bottombar)
│   │   ├── page.tsx             # Home feed
│   │   ├── activity/            # Activity / notifications page
│   │   ├── communities/         # Communities listing & detail pages
│   │   ├── create-thread/       # Create new thread page
│   │   ├── profile/[id]/        # User profile page
│   │   ├── search/              # User search page
│   │   └── thread/              # Individual thread page
│   ├── api/
│   │   ├── uploadthing/         # UploadThing API routes
│   │   └── webhooks/clerk/      # Clerk webhook handler
│   ├── globals.css              # Global styles
│   └── favicon.ico
├── components/
│   ├── cards/                   # Card components
│   │   ├── ThreadCard.tsx       # Thread display card
│   │   ├── CommunityCard.tsx    # Community display card
│   │   ├── UserCard.tsx         # User display card
│   │   ├── ThreadLikeButton.tsx # Like interaction button
│   │   ├── ThreadRepostButton.tsx # Repost interaction button
│   │   └── ThreadShareButton.tsx  # Share interaction button
│   ├── forms/                   # Form components
│   │   ├── AccountProfile.tsx   # Profile edit form
│   │   ├── PostThread.tsx       # Create thread form
│   │   ├── Comment.tsx          # Comment/reply form
│   │   ├── DeleteThread.tsx     # Thread deletion handler
│   │   └── ConfirmDeleteModal.tsx # Deletion confirmation modal
│   ├── shared/                  # Shared layout components
│   │   ├── Topbar.tsx           # Top navigation bar
│   │   ├── LeftSidebar.tsx      # Left sidebar navigation
│   │   ├── RightSidebar.tsx     # Right sidebar (suggestions)
│   │   ├── Bottombar.tsx        # Mobile bottom navigation
│   │   ├── ProfileHeader.tsx    # User profile header
│   │   ├── ThreadsTab.tsx       # Threads tab content
│   │   ├── RepostsTab.tsx       # Reposts tab content
│   │   ├── Searchbar.tsx        # Search input component
│   │   ├── Pagination.tsx       # Pagination controls
│   │   └── PaginationWrapper.tsx
│   └── ui/                      # Radix-based UI primitives
├── lib/
│   ├── actions/                 # Server actions
│   │   ├── thread.actions.ts    # Thread CRUD operations
│   │   ├── user.actions.ts      # User CRUD operations
│   │   └── community.actions.ts # Community CRUD operations
│   ├── models/                  # Mongoose models
│   │   ├── thread.model.ts      # Thread schema
│   │   ├── user.model.ts        # User schema
│   │   └── community.model.ts   # Community schema
│   ├── validations/             # Zod validation schemas
│   │   ├── thread.ts            # Thread form validation
│   │   └── user.ts              # User form validation
│   ├── mongoose.ts              # MongoDB connection utility
│   ├── uploadthing.ts           # UploadThing configuration
│   └── utils.ts                 # Utility functions
├── constants/
│   └── index.js                 # Sidebar links, profile & community tabs
├── public/
│   ├── assets/                  # SVG icons and assets
│   └── logo.svg                 # App logo
├── middleware.ts                # Clerk auth middleware
├── next.config.ts               # Next.js configuration
├── package.json
├── tsconfig.json
└── tailwind / postcss configs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **MongoDB** database (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Clerk** account — [clerk.com](https://clerk.com)
- **UploadThing** account — [uploadthing.com](https://uploadthing.com)

### 1. Clone the Repository

```bash
git clone https://github.com/ahmednasser111/threads.git
cd threads
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/threads

# UploadThing
UPLOADTHING_SECRET=sk_live_xxxxx
UPLOADTHING_APP_ID=xxxxx

# Clerk Webhook (Svix)
CLERK_WEBHOOK_SECRET=whsec_xxxxx
```

### 4. Run the Development Server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 📦 Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `yarn dev`       | Start the development server       |
| `yarn build`     | Build the production application   |
| `yarn start`     | Start the production server        |
| `yarn lint`      | Run ESLint for code quality checks |

---

## 🗄️ Database Models

### User

| Field       | Type       | Description                     |
| ----------- | ---------- | ------------------------------- |
| `id`        | String     | Clerk user ID (unique)          |
| `username`  | String     | Unique username                 |
| `name`      | String     | Display name                    |
| `image`     | String     | Profile image URL               |
| `bio`       | String     | User bio (max 500 chars)        |
| `threads`   | ObjectId[] | References to authored threads  |
| `onboarded` | Boolean    | Whether onboarding is completed |
| `communities` | ObjectId[] | Communities the user belongs to |

### Thread

| Field       | Type       | Description                       |
| ----------- | ---------- | --------------------------------- |
| `text`      | String     | Thread content                    |
| `author`    | ObjectId   | Reference to the author (User)    |
| `community` | ObjectId   | Reference to a community          |
| `createdAt` | Date       | Timestamp of creation             |
| `parentId`  | String     | Parent thread ID (for replies)    |
| `likes`     | String[]   | Array of user IDs who liked       |
| `reposts`   | String[]   | Array of user IDs who reposted    |
| `children`  | ObjectId[] | References to child threads       |

### Community

| Field       | Type       | Description                      |
| ----------- | ---------- | -------------------------------- |
| `id`        | String     | Clerk organization ID            |
| `username`  | String     | Unique community handle          |
| `name`      | String     | Community display name           |
| `image`     | String     | Community image URL              |
| `bio`       | String     | Community description            |
| `createdBy` | ObjectId   | Reference to creator (User)      |
| `threads`   | ObjectId[] | References to community threads  |
| `members`   | ObjectId[] | References to community members  |

---

## 🔗 API Routes

| Route                        | Method | Description                          |
| ---------------------------- | ------ | ------------------------------------ |
| `/api/uploadthing`           | POST   | Handle file uploads via UploadThing  |
| `/api/webhooks/clerk`        | POST   | Handle Clerk webhook events (Svix)   |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React framework for production
- [Clerk](https://clerk.com/) — Authentication and user management
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [UploadThing](https://uploadthing.com/) — File upload service
- [Radix UI](https://www.radix-ui.com/) — Accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
