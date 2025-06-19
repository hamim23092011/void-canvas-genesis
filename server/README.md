# WhereIsIt Server (DEMO ONLY)

**⚠️ IMPORTANT: This is a dummy server for demonstration purposes only!**

This server code will NOT work in the Lovable environment. Lovable is a frontend-only platform that uses **Supabase** as the backend service.

## Why This Exists

This folder structure shows what a traditional Express.js server would look like for the WhereIsIt Lost & Found application, but it's provided only for:

- Educational reference
- Portfolio demonstration
- Understanding of full-stack architecture
- Showing what would be needed if building with MERN stack

## Actual Backend Implementation

The **actual backend** for this application is handled by:

- **Supabase Database** - PostgreSQL with Row Level Security
- **Supabase Auth** - User authentication and authorization  
- **Supabase Storage** - File uploads and image storage
- **Supabase Edge Functions** - Serverless functions for custom logic

## Dummy Server Structure

```
server/
├── package.json          # Dependencies (won't install)
├── index.js              # Main server file (won't run)
├── .env.example          # Environment variables example
├── models/               # MongoDB models (not used)
│   ├── User.js
│   └── Item.js
└── routes/               # API routes (not functional)
    ├── auth.js
    ├── items.js
    └── users.js
```

## What Each File Would Do

### `index.js`
Main Express server with middleware setup, route mounting, and error handling.

### `routes/auth.js`
- User registration and login
- JWT token generation
- Password hashing and validation
- Email verification

### `routes/items.js`
- CRUD operations for lost/found items
- Search and filtering
- Image upload handling
- Status updates (recovered/active)

### `routes/users.js`
- User profile management
- User's posted items
- Recovery history
- Profile updates

### `models/`
MongoDB schemas that would define:
- User data structure
- Item data structure
- Relationships and validations

## Equivalent Supabase Implementation

Instead of this Express server, the app uses:

```typescript
// Database operations
import { supabase } from '@/integrations/supabase/client';

// Create item
const { data, error } = await supabase
  .from('items')
  .insert(itemData);

// Get user's items  
const { data, error } = await supabase
  .from('items')
  .select('*')
  .eq('user_id', userId);

// Authentication
await supabase.auth.signUp({ email, password });
await supabase.auth.signInWithPassword({ email, password });
```

## Deployment Note

If you wanted to deploy this Express server separately:

1. Set up a MongoDB database
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean App Platform
   - AWS EC2/ECS

But for this project, everything is handled by Supabase! 🚀