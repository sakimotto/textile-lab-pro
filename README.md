# TextileLab Pro

A comprehensive laboratory management system for textile testing facilities. Built with Next.js, PostgreSQL, and Google Cloud Platform.

## Features

- **Sample Management**
  - Sample registration and tracking
  - Material type categorization
  - Client association
  - Status monitoring throughout testing lifecycle

- **Test Management**
  - Test assignment to technicians
  - Standardized test methods
  - Results recording and validation
  - Quality control checks

- **Calendar & Scheduling**
  - Visual test scheduling
  - Equipment maintenance planning
  - Client visit coordination
  - Resource allocation

- **User Management**
  - Multi-user roles (Admin, Technician, Manager, Client)
  - Role-based access control
  - Google OAuth authentication
  - User activity tracking

- **Equipment Tracking**
  - Inventory management
  - Calibration scheduling
  - Maintenance history
  - Status monitoring

- **Reporting System**
  - Customizable test reports
  - Performance analytics
  - Client-specific reporting
  - Export capabilities (PDF, CSV)

- **Modern, Responsive Interface**
  - Mobile-friendly design
  - Intuitive workflows
  - Real-time updates
  - Accessibility features

## Tech Stack

- **Frontend**: 
  - Next.js 14 with App Router
  - React 18 with Hooks
  - TailwindCSS for styling
  - Shadcn UI component library
  - React Big Calendar for scheduling

- **Backend**: 
  - Next.js API Routes (serverless)
  - RESTful API design
  - Server-side rendering

- **Database**: 
  - PostgreSQL 17.2
  - Relational data model
  - Proper indexing and optimization

- **ORM**: 
  - Prisma for type-safe database access
  - Migration management
  - Data validation

- **Authentication**: 
  - NextAuth.js with Google OAuth
  - JWT token management
  - Role-based access control

- **Cloud**: 
  - Google Cloud Platform
  - Cloud Run for containerized deployment
  - Cloud SQL for managed database
  - Cloud Storage for assets
  - Cloud Monitoring for observability

- **Development**: 
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - Git for version control
  - GitHub Actions for CI/CD

## Current Status

The project is currently in development with the following components implemented:
- ✅ Next.js application scaffold with routing
- ✅ UI components and design system
- ✅ Database schema design
- ✅ Basic authentication system (password-based)
- ✅ Sample management interface
- ✅ Calendar functionality

See [Current Status](./docs/CURRENT_STATUS.md) for detailed information.

## Getting Started

1. **Prerequisites**
   - Node.js 18.x or later
   - PostgreSQL 17.2
   - DBeaver 24.3.2 (or any PostgreSQL client)
   - Google Cloud Console access (for production deployment)

2. **Installation**
   ```bash
   # Clone the repository
   git clone [your-repo-url]
   cd textile-lab-pro

   # Install dependencies
   npm install
   ```

3. **Environment Setup**
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
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   npx prisma migrate dev
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3002

## Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Implementation Plan](./docs/IMPLEMENTATION_PLAN.md)
- [Current Status](./docs/CURRENT_STATUS.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Project Structure

```
textile-lab-pro/
├── src/
│   ├── app/                # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── calendar/       # Calendar pages
│   │   ├── clients/        # Client management
│   │   ├── reports/        # Reporting pages
│   │   ├── samples/        # Sample management
│   │   └── tests/          # Test management
│   ├── components/         # React components
│   │   ├── auth/           # Authentication components
│   │   ├── calendar/       # Calendar components
│   │   ├── common/         # Shared components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── layout/         # Layout components
│   │   ├── samples/        # Sample components
│   │   └── ui/             # UI components
│   ├── lib/                # Utility functions
│   ├── services/           # Service layer
│   ├── types/              # TypeScript types
│   └── utils/              # Helper utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.ts             # Seed data
│   └── migrations/         # Database migrations
├── scripts/                # Utility scripts
├── config/                 # Configuration files
├── docs/                   # Documentation
│   ├── DATABASE_SCHEMA.md  # Database documentation
│   ├── IMPLEMENTATION_PLAN.md # Implementation plan
│   └── CURRENT_STATUS.md   # Current status
└── tests/                  # Test files
```

## Roadmap

The project follows a 10-12 week implementation plan:

1. **Phase 1**: Local Development (Weeks 1-3)
   - Database setup
   - Authentication
   - Core feature implementation

2. **Phase 2**: Google Cloud Setup (Weeks 4-5)
   - GCP project configuration
   - Cloud infrastructure setup

3. **Phase 3**: Staging Environment (Weeks 6-8)
   - Deployment pipeline
   - Testing and validation

4. **Phase 4**: Production Preparation (Weeks 9-10)
   - Security hardening
   - Monitoring setup

5. **Phase 5**: Launch & Maintenance (Weeks 11-12)
   - Production deployment
   - Documentation and training

See [Implementation Plan](./docs/IMPLEMENTATION_PLAN.md) for detailed information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [your-email] or open an issue in the repository.
