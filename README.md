# WhereIsIt - Lost & Found Web Application

## Project Overview
WhereIsIt is a comprehensive Lost & Found platform that connects individuals who have lost personal belongings with those who may have found them. Built with modern web technologies, this application provides a seamless experience for reporting lost items, browsing found items, and facilitating successful reunions.

## Live Demo
[Your deployed URL will go here]

## Key Features

### Authentication System
- Email/password authentication with validation
- Google OAuth integration
- Secure user sessions with Supabase Auth
- Password requirements: 6+ characters, uppercase, lowercase

### Core Functionality
- **Report Items**: Users can report lost or found items with detailed information
- **Browse Items**: Search and filter through all reported items
- **Item Recovery**: Mark items as recovered with detailed recovery information
- **User Dashboard**: Manage personal items and view recovery history
- **Real-time Updates**: Live updates when items are recovered

### Design & UX
- Fully responsive design (mobile, tablet, desktop)
- Framer Motion animations throughout
- Clean, professional UI with proper spacing and contrast
- Accessible design with semantic HTML

### Technical Features
- Protected routes for authenticated users
- Dynamic page titles
- Search functionality by title and location
- Image upload support
- Date picker integration
- Toast notifications for all actions

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **React Datepicker** - Date selection component

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Data access control
- **Real-time subscriptions** - Live data updates

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## Database Schema

### Tables
- **profiles** - User profile information
- **items** - Lost and found item records
- **recovered_items** - Recovery tracking

### Security
- Row Level Security (RLS) policies
- User-based data access control
- Secure API endpoints

## Installation & Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd whereis-it
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Supabase configuration is already included
# No additional environment variables needed
```

4. Start development server
```bash
npm run dev
```

## Pages & Routes

- `/` - Homepage with hero slider and latest items
- `/auth` - Authentication (login/signup)
- `/allItems` - Browse all lost & found items
- `/items/:id` - Item details page (protected)
- `/addItems` - Report new item (protected)
- `/myItems` - Manage user's items (protected)
- `/updateItems/:id` - Edit item (protected)
- `/allRecovered` - View recovered items (protected)

## Features Implementation

### Authentication
✅ Email/password registration and login
✅ Google OAuth integration
✅ Password validation (6+ chars, uppercase, lowercase)
✅ Protected routes
✅ User profile management

### Item Management
✅ Add lost/found items with categories
✅ Image upload support
✅ Date picker for incident dates
✅ Location tracking
✅ Item status management

### Search & Discovery
✅ Search by title and location
✅ Category filtering
✅ Latest items display
✅ Responsive card layouts

### Recovery System
✅ Mark items as recovered
✅ Recovery details tracking
✅ Recovery history
✅ Recovery confirmation

### UI/UX
✅ Framer Motion animations
✅ Responsive design
✅ Toast notifications
✅ Loading states
✅ Error handling
✅ Professional design

## NPM Packages Used

### Core Dependencies
- `react` & `react-dom` - React framework
- `@supabase/supabase-js` - Supabase client
- `react-router-dom` - Routing
- `framer-motion` - Animations
- `react-datepicker` - Date selection
- `react-hook-form` - Form handling
- `@tanstack/react-query` - Data fetching

### UI Components
- `@radix-ui/*` - Primitive components
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `class-variance-authority` - Component variants
- `tailwind-merge` - Class merging
- `sonner` - Toast notifications

### Development
- `typescript` - Type safety
- `vite` - Build tool
- `eslint` - Code linting
- `autoprefixer` - CSS prefixing

## Contributing
This project demonstrates modern web development practices including:
- Clean architecture and component structure
- Type-safe development with TypeScript
- Responsive design principles
- User authentication and authorization
- Real-time data management
- Professional UI/UX design

## Deployment
Ready for deployment on platforms like Vercel, Netlify, or similar hosting services.

---

Built with ❤️ using React, TypeScript, Supabase, and modern web technologies.