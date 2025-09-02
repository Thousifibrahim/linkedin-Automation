# GoLinked - LinkedIn Automation Platform  

![Status](https://img.shields.io/badge/status-in_development-orange)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Made with](https://img.shields.io/badge/made%20with-React%20%26%20TypeScript-61DAFB?logo=react)  
![Backend](https://img.shields.io/badge/backend-Express.js-green)  
![Database](https://img.shields.io/badge/database-PostgreSQL-336791?logo=postgresql)  
![AI](https://img.shields.io/badge/AI-xAI%20Grok-purple)  

> ⚠️ **Alert:** This project is still under active development. Features may change rapidly.  

---
## Overview 
--- 
**GoLinked** (Grow on LinkedIn Agent) is an AI-powered automation platform that helps professionals **generate, schedule, and analyze LinkedIn content**.  
It provides:  
- AI post generation  
- Trend research  
- Scheduling & calendar  
- Analytics dashboard  

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Vite Build System**: Fast development server and optimized production builds
- **UI Framework**: Shadcn/UI components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Express.js Server**: RESTful API server with middleware for JSON parsing and request logging
- **TypeScript**: Full type safety across the backend with shared schemas
- **In-Memory Storage**: Custom storage implementation for demo purposes (easily replaceable with database)
- **AI Integration**: xAI Grok API integration for content generation and trend analysis
- **Development Setup**: Hot module replacement with Vite integration for seamless development

### Database Design
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Schema Structure**: 
  - Users table with LinkedIn connection status
  - Posts table with content, scheduling, and engagement tracking
  - Trending topics table with category and scoring system
  - Analytics table for performance metrics
- **Migration System**: Drizzle Kit for database schema migrations

### API Structure
- **RESTful Endpoints**:
  - `/api/user` - User profile management
  - `/api/generate-content` - AI-powered content generation
  - `/api/research-trends` - Trending topic research
  - `/api/posts/*` - Post management and scheduling
  - `/api/analytics` - Performance analytics
- **Request/Response**: JSON-based communication with Zod schema validation
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Component Architecture
- **Dashboard Layout**: Modular dashboard with reusable components
- **Feature Components**: 
  - Content Creator for AI post generation
  - Trending Topics for industry research
  - Scheduling Calendar for content planning
  - Analytics Dashboard for performance tracking
- **UI Components**: Consistent design system with variant-based styling
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### AI Services
- **xAI Grok API**: Grok-2-1212 model for content generation and trend analysis
- **Content Generation**: Professional LinkedIn post creation with engagement predictions
- **Trend Research**: Industry-specific trending topic discovery

### Database
- **Neon Database**: Serverless PostgreSQL database for production
- **Connection**: PostgreSQL-compatible serverless database with connection pooling

### UI Libraries
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for content displays
- **React Hook Form**: Form management with validation

### Development Tools
- **Vite**: Build tool with HMR and optimized bundling
- **TSX**: TypeScript execution for development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### Date and Utility Libraries
- **Date-fns**: Date manipulation and formatting
- **Class Variance Authority**: Type-safe component variants
- **CLSX**: Conditional className utility
- **Nanoid**: Unique ID generation

### Session Management
- **Connect-PG-Simple**: PostgreSQL session store for Express sessions


Developed by [Smdspace](https://github.com/smdspace-dev)

