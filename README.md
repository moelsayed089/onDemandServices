# 🚚 OnDemand Services Platform

A modern and responsive platform for managing delivery requests built using **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui**.  
It allows users to submit delivery requests, estimate prices based on distance and duration, track drivers in real-time, and manage orders efficiently.

---

## 🛠️ Tech Stack

| Technology            | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| React                 | Component-based UI framework                               |
| TypeScript            | Type-safe JavaScript for better scalability                |
| Vite                  | Lightning-fast build tool and development server           |
| Tailwind CSS          | Utility-first CSS framework for rapid UI styling           |
| shadcn/ui             | Accessible, customizable, and theme-able UI components     |
| Redux Toolkit         | Predictable and centralized state management               |
| TanStack Query        | Powerful async state management (fetching, caching, etc.)  |
| Formik + Yup          | Form state handling and schema-based validation            |
| Google Maps API       | Location autocomplete, route drawing, distance calculation |
| React Testing Library | Unit & integration testing for components                  |
| Vitest                | Fast unit test runner compatible with Vite                 |
| ESLint + Prettier     | Linting and formatting tools to maintain code quality      |

> ✅ Testing coverage includes:
>
> - Pure functions (utilities, price estimation logic, etc.)
> - UI components with interaction (form submissions, modals, buttons)
> - API behavior using mock handlers (msw)
> - Form validation scenarios (Formik + Yup)

## ✨ Features

- 🔐 **Authentication**

  - Login using `accessToken` and `refreshToken`
  - Persistent session handling via localStorage

- 🗺️ **Delivery Request**

  - Select pickup and drop-off using Google Maps Autocomplete
  - Calculates distance and duration via Distance Matrix API
  - Dynamic price estimation based on distance, duration, and base price

- 🛰️ **Real-Time Driver Tracking**

  - Displays live driver location on the map
  - Update coordinates through API
  - Real-time location updates via socket io ✅

- 📦 **Order Management**

  - View order history with filters by status
  - Display details like pickup/drop-off, status, and time

- 🧑‍💼 **Admin Dashboard**

  - Centralized interface for managing users, drivers, and orders
  - View live driver locations and statuses
  - Monitor platform activity and request metrics

- 🎨 **UI Design with shadcn/ui**

  - Consistent and accessible components
  - Integrated with Tailwind for easy theming
  - Components like buttons, dialogs, cards, forms

- 📱 **Responsive Design**
  - Mobile-first layout
  - Fully adaptive on all screen sizes

## 📁 Project Structure

```txt
src/
├── app/
│   ├── api/                 # Axios config or API layer
│   ├── Layout/              # Layout components like headers, sidebars
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Vite entry point
│   ├── routes.tsx           # Route configuration
│   └── store.ts             # Redux store setup
├── assets/                  # Static assets (icons, images)
├── features/                # Domain-level features
│   ├── move/                # Delivery request and tracking
│   │   ├── components/      # UI components for delivery features
│   │   ├── pages/           # Pages: CreateRequest, TrackRequest, etc.
│   │   ├── services/        # API service functions (e.g., estimate, location)
│   │   ├── types/           # TypeScript type definitions and enums
│   │   └── validation/      # Yup validation schemas
│   ├── auth/                # Authentication logic
│   ├── dashboard/           # Dashboard pages & components
│   └── profile/             # User profile management
├── lib/
│   └── utils.ts             # Helper functions and external lib wrappers
├── pages/                   # Page-level components
│   ├── ErrorHandler.tsx
│   ├── Home.tsx
│   ├── Start.tsx
│   ├── Test.tsx
│   └── TokenRefresher.tsx   # Handles token refresh logic
├── shared/                  # Reusable UI and design system
│   ├── components/
│   │   ├── atoms/           # Small, indivisible UI elements
│   │   ├── molecules/       # Combinations of atoms
│   │   └── organisms/       # Complex, reusable UI sections
│   └── ui/                  # Components from shadcn/ui or extended components
├── data/                    # Static or mock data (if any)
├── utils/
│   └── utils.ts             # Global utility functions
├── App.css                  # Global app styles (if used)
├── App.test.tsx             # App-level test file
├── index.css                # Tailwind or global CSS
├── setupTests.ts            # Testing setup for Jest or Vitest
└── vite-env.d.ts            # Vite type declarations
```

## 🌐 Live Demo

Check the live version: [ondemand-services.vercel.app](https://on-demand-services-rose.vercel.app/)

## 🚧 Future Enhancements

- driver dashboard for full control over orders
- Multi-language support (i18n)

## 👨‍💻 Author

Made with ❤️ by **Mohamed Elsayed**  
GitHub: [@moelsayed089](https://github.com/moelsayed089)
