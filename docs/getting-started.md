# Getting Started with TextileLab Pro

## Prerequisites
- Node.js (latest LTS version)
- PostgreSQL 17.2
- DBeaver 24.3.2
- Git
- Google Cloud Console access

## Quick Start Guide

### 1. Initial Setup
```bash
# Clone the repository
git clone [repository-url]
cd textile-lab-pro

# Install dependencies
npm install
```

### 2. Google Cloud Setup
1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable OAuth 2.0

2. **Configure OAuth Credentials**
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     ```
     http://localhost:3002/api/auth/callback/google
     ```
   - Save Client ID and Client Secret

### 3. Database Setup
1. **Install PostgreSQL 17.2**
   - Download from https://www.postgresql.org/
   - Install with default options
   - Remember your password!

2. **Install DBeaver 24.3.2**
   - Download from https://dbeaver.io/
   - Connect to PostgreSQL:
     ```
     Host: localhost
     Port: 5432
     Database: textilelab
     Username: postgres
     Password: [your-password]
     ```

3. **Create Local Database**
   ```sql
   CREATE DATABASE textilelab;
   ```

### 4. Environment Setup
Create a `.env` file:
```env
# Database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/textilelab"
DIRECT_URL="postgresql://postgres:your_password@localhost:5432/textilelab"

# Auth
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="your-dev-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (for notifications)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-password"
```

### 5. Run Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### 6. Start Development Server
```bash
npm run dev
```
Visit http://localhost:3002 and click "Sign in with Google"

## Development Workflow

### 1. Authentication Flow
1. User clicks "Sign in with Google"
2. Google OAuth handles authentication
3. On first login:
   - User profile created in database
   - Awaits role assignment by admin
4. On subsequent logins:
   - User session created
   - Access based on assigned role

### 2. User Roles
- **Admin**: Full system access
- **Technician**: Test management
- **Manager**: Reports and oversight
- **Client**: Sample submission and tracking

### 3. File Structure
```
textile-lab-pro/
├── src/
│   ├── app/          # Next.js app router
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── styles/       # CSS files
├── prisma/
│   ├── schema.prisma # Database schema
│   └── migrations/   # Database migrations
└── docs/            # Documentation
```

## Common Issues

### Authentication Issues
1. Verify Google OAuth credentials
2. Check redirect URIs
3. Ensure environment variables are set
4. Check database connection

### Database Connection
1. Check PostgreSQL is running
2. Verify password in .env
3. Ensure database exists
4. Check port availability

## Next Steps
See [CURRENT_STATUS.md](./CURRENT_STATUS.md) for:
- Current project status
- Upcoming tasks
- Known issues
- Development roadmap
