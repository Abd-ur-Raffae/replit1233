# Overview

This is a full-stack web application built as a personal portfolio website for Abd-ur-Raffae Masood, a Full Stack Engineer. The project showcases a modern, responsive portfolio with interactive 3D elements, smooth animations, and a dark theme design. The application is built using React with TypeScript on the frontend and Express.js on the backend, following a monorepo structure with shared types and schemas.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with a custom dark theme and CSS variables for consistent design tokens
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessibility
- **Animations**: Framer Motion for smooth page transitions and interactive animations
- **3D Graphics**: React Three Fiber integration for immersive 3D experiences
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Storage**: In-memory storage implementation with interface for future database integration
- **API Structure**: RESTful API design with `/api` prefix for all endpoints

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon serverless integration
- **Schema**: Centralized schema definitions in shared directory
- **Validation**: Zod schemas for runtime type validation
- **Migrations**: Drizzle Kit for database schema management

## Development Environment
- **Build System**: Vite for fast development and optimized production builds
- **Package Manager**: npm with lockfile for consistent dependencies
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Hot Reload**: Vite HMR with Express middleware integration
- **Error Handling**: Runtime error overlay for development debugging

## Design System
- **Theme**: Dark-first design with cyan and purple accent colors
- **Typography**: Inter font family with JetBrains Mono for code
- **Components**: Modular component architecture with shadcn/ui
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure WCAG compliance

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth transitions
- **wouter**: Lightweight routing library

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **clsx**: Conditional className utility
- **lucide-react**: Icon library

## Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **tsx**: TypeScript execution engine for Node.js

## Form and Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: Schema validation library

## Database and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express
- **drizzle-kit**: Database migration and introspection tool

## Utility Libraries
- **date-fns**: Date manipulation library
- **embla-carousel-react**: Carousel component
- **cmdk**: Command palette component
- **nanoid**: URL-safe unique ID generator