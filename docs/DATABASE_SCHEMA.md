# TextileLab Pro Database Schema

## Core Tables

### 1. Users
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  googleId      String    @unique  // Google OAuth ID
  role          String    // Admin, Technician, Manager, Client
  image         String?   // Google profile image
  assignedTests Test[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 2. Samples
```prisma
model Sample {
  id           String    @id @default(cuid())
  sampleCode   String    @unique
  clientId     String
  client       User      @relation(fields: [clientId], references: [id])
  materialType String
  description  String?
  dateReceived DateTime
  tests        Test[]
  status       String    // Pending, InProgress, Completed, Rejected
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

### 3. Tests
```prisma
model Test {
  id             String    @id @default(cuid())
  testCode       String    @unique
  sampleId       String
  sample         Sample    @relation(fields: [sampleId], references: [id])
  testType       String
  parameters     Json
  results        Json?
  status         String    // Pending, InProgress, Completed, Failed
  assignedTo     String?
  technician     User?     @relation(fields: [assignedTo], references: [id])
  startDate      DateTime?
  completionDate DateTime?
  notes          String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

### 4. Equipment
```prisma
model Equipment {
  id              String    @id @default(cuid())
  name            String
  type            String
  serialNumber    String    @unique
  calibrationDate DateTime
  nextCalibration DateTime
  status          String    // Available, InUse, Maintenance, Retired
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

### 5. Test Methods
```prisma
model TestMethod {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  description String
  parameters  Json
  standardRef String?   // Reference to industry standards (e.g., ASTM, ISO)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Authentication Tables

### 6. Sessions (Managed by NextAuth)
```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 7. Accounts (For Google OAuth)
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String  // "oauth"
  provider          String  // "google"
  providerAccountId String
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

## Calendar Integration

### 8. Calendar Events
```prisma
model CalendarEvent {
  id            String    @id @default(cuid())
  title         String
  type          EventType
  description   String?
  startAt       DateTime
  endAt         DateTime
  allDay        Boolean   @default(false)
  testId        String?
  test          Test?     @relation(fields: [testId], references: [id])
  maintenanceId String?
  maintenance   Maintenance? @relation(fields: [maintenanceId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum EventType {
  TEST
  MAINTENANCE
  CLIENT_VISIT
  TRAINING
  OTHER
}
```

## Best Practices Implemented

1. **Primary Keys**: 
   - Every table has an auto-incrementing `id` as primary key
   - Using `@id` and `@default(cuid())` for auto-increment

2. **Foreign Keys**: 
   - All relationships are properly constrained
   - Using `@relation` for referential integrity

3. **Timestamps**: 
   - All tables include `createdAt` and `updatedAt`
   - Using `@default(now())` and `@updatedAt` for proper time handling

4. **Data Integrity**:
   - Required fields marked as required
   - Unique constraints where appropriate
   - Enum-like fields using enums

5. **Junction Tables**:
   - Proper many-to-many relationships
   - Include their own primary keys
   - Include timestamps for auditing

## Implementation Steps

1. Create tables in this order:
   - users (no dependencies)
   - samples (depends on users)
   - tests (depends on samples)
   - equipment (no dependencies)
   - test methods (no dependencies)
   - sessions (depends on users)
   - accounts (depends on users)
   - calendar events (depends on tests and maintenance)

2. Add indexes after table creation:
   - Use Prisma's built-in indexing support

3. Add triggers for updating `updatedAt`:
   - Use Prisma's built-in `@updatedAt` support

4. Apply triggers to all tables:
   - Use Prisma's built-in `@updatedAt` support

## Relationships

1. **User - Sample**
   - One-to-Many: A user (client) can have many samples
   - Each sample belongs to one client

2. **Sample - Test**
   - One-to-Many: A sample can have multiple tests
   - Each test belongs to one sample

3. **User - Test**
   - One-to-Many: A user (technician) can be assigned many tests
   - Each test can be assigned to one technician

## Indexes and Constraints

### Unique Constraints
- User.email
- User.googleId
- Sample.sampleCode
- Test.testCode
- Equipment.serialNumber
- TestMethod.code

### Foreign Key Constraints
- Sample.clientId -> User.id
- Test.sampleId -> Sample.id
- Test.assignedTo -> User.id

## Notes

1. **Authentication**
   - Using Google OAuth exclusively
   - No password storage needed
   - Sessions managed by NextAuth.js

2. **Role Management**
   - Roles: Admin, Technician, Manager, Client
   - Role assignment done by admin
   - No default role (must be assigned)

3. **Timestamps**
   - All tables include createdAt and updatedAt
   - Automatically managed by Prisma
