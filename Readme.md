⚠️ **Note:** This project is under active development. Features are being added regularly.


[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)


*AI-powered LinkedIn content automation - Generate, schedule, and analyze your posts*

# 
# LinkedIn Automation Platform

**GoLinked** (Grow on LinkedIn Agent) is an AI-powered platform that automates your LinkedIn content workflow. It helps professionals create engaging posts, stay on top of industry trends, and analyze their performance - all in one place.

### **Core Features:**
- *AI Content Generator** - Create professional LinkedIn posts with xAI Grok
- *Trend Research** - Discover trending topics in your industry
- *Smart Scheduling** - Plan and schedule your content calendar
- *Analytics Dashboard** - Track engagement and performance metrics
- *Modern UI** - Beautiful, responsive interface with dark mode

---

## Architecture Overview

```
Frontend (React + TypeScript)
    ↓
Express.js API Server
    ↓
PostgreSQL Database (Neon)
    ↓
xAI Grok API (Content Generation)
```

### **Tech Stack Breakdown:**

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- Shadcn/UI + Radix UI (components)
- TailwindCSS (styling)
- TanStack Query (state management)
- Wouter (routing)
- React Hook Form + Zod (forms)

**Backend:**
- Express.js with TypeScript
- Drizzle ORM (database)
- PostgreSQL (Neon serverless)
- xAI Grok API integration
- Session management

---

## 📁 Project Structure

```
golinked/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities & API client
│   │   └── pages/           # Route pages
│   └── public/              # Static assets
├── server/                   # Backend Express API
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Data layer
│   └── index.ts            # Server entry
├── db/                      # Database schema
│   └── schema.ts           # Drizzle schema definitions
└── shared/                  # Shared types & schemas
    └── types.ts            # TypeScript interfaces
```

---

##  Getting Started :

### **Prerequisites**
- Node.js 18+ installed
- PostgreSQL database (or Neon account)
- xAI API key ([Get one here](https://console.x.ai/))

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/smdspace-dev/golinked.git
cd golinked
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root:
```env
DATABASE_URL=postgresql://user:password@host:5432/database
XAI_API_KEY=your_xai_api_key_here
SESSION_SECRET=your_random_secret_key
PORT=5000
```

4. **Set up database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

---

## 🔌 API Endpoints

### **User Management**
- `GET /api/user` - Get current user profile
- `POST /api/user/linkedin-connect` - Connect LinkedIn account

### **Content Generation**
- `POST /api/generate-content` - Generate AI-powered LinkedIn post
  ```json
  {
    "topic": "AI in healthcare",
    "tone": "professional",
    "length": "medium"
  }
  ```

### **Trend Research**
- `POST /api/research-trends` - Get trending topics
  ```json
  {
    "industry": "technology",
    "timeframe": "week"
  }
  ```

### **Post Management**
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/schedule` - Schedule post

### **Analytics**
- `GET /api/analytics` - Get performance metrics
- `GET /api/analytics/:postId` - Get specific post analytics

---

## Key Components

### **Dashboard Layout**
Main application shell with navigation and routing

### **Content Creator**
- AI-powered post generation
- Tone and style customization
- Preview and edit functionality
- Engagement prediction

### **Trending Topics**
- Industry-specific trend discovery
- Category filtering
- Trending score indicators
- One-click content generation from trends

### **Scheduling Calendar**
- Visual content calendar
- Drag-and-drop scheduling
- Batch scheduling support
- Publishing status tracking

### **Analytics Dashboard**
- Performance metrics visualization
- Engagement tracking
- Trend analysis
- Export capabilities

---

##  AI Integration

GoLinked uses **xAI Grok-2-1212** model for:
- Professional LinkedIn post generation
- Content tone adaptation
- Engagement prediction
- Industry trend analysis
- Topic research

**Example AI-generated post:**
```
Input: "AI in healthcare"
Output: A professionally crafted LinkedIn post about AI's impact 
on healthcare, with relevant hashtags and engagement hooks.
```

---

## Database Schema

### **Users Table**
```typescript
- id: UUID
- username: string
- linkedinConnected: boolean
- createdAt: timestamp
```

### **Posts Table**
```typescript
- id: UUID
- userId: UUID
- content: text
- scheduledFor: timestamp
- status: enum (draft, scheduled, published)
- engagementMetrics: json
```

### **Trending Topics Table**
```typescript
- id: UUID
- topic: string
- category: string
- trendingScore: number
- discoveredAt: timestamp
```

### **Analytics Table**
```typescript
- id: UUID
- postId: UUID
- views: number
- likes: number
- comments: number
- shares: number
- recordedAt: timestamp
```

---

## 🔧 Development

### **Run in development mode:**
```bash
npm run dev
```

### **Build for production:**
```bash
npm run build
```

### **Run production build:**
```bash
npm start
```

### **Database migrations:**
```bash
npm run db:generate  # Generate migration
npm run db:push      # Apply migration
```

### **Type checking:**
```bash
npm run typecheck
```
---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request



## Contact & Connect


[![Email](https://img.shields.io/badge/Email-contact.thousif+github@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact.thousif+github@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Thousif%20Ibrahim-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thousif-ibrahim-29050421b)


---

**⭐ Star this repo if you find it useful!**

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=smdspace-dev.golinked)

</div>
