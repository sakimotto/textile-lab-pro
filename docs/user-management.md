# User Management Guide

## Overview
This guide covers user management procedures in TextileLab Pro, including user creation, role management, and authentication.

## User Roles
TextileLab Pro supports the following user roles:
- **Admin**: Full system access and user management
- **Technician**: Access to testing procedures and results
- **Manager**: Overview of operations and reporting
- **Client**: Limited access to their own test results

## Adding New Users

### Method 1: Using the Admin Dashboard
1. Log in with admin credentials
2. Navigate to Settings > User Management
3. Click "Add New User"
4. Fill in required information:
   - Email
   - Name
   - Role
   - Initial password (user will be prompted to change)

### Method 2: Using the Command Line
Create a new user using the provided script:

```bash
# Navigate to project directory
cd path/to/textile-lab-pro

# Run the user creation script
node scripts/create-user.mjs
```

Example user creation script:
```javascript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser(email, password, name, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role,
    },
  });

  return user;
}

// Example usage:
createUser(
  'user@example.com',
  'SecurePassword123!',
  'John Doe',
  'TECHNICIAN'
)
.then(console.log)
.catch(console.error)
.finally(() => prisma.$disconnect());
```

## Password Requirements
- Minimum 8 characters
- Must include:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters
- Cannot be a commonly used password

## User Authentication
- Users authenticate via email/password
- Sessions are managed by NextAuth.js
- JWT tokens are used for API authentication
- Session duration: 24 hours

## Security Practices
1. Passwords are hashed using bcrypt
2. Failed login attempts are logged
3. Password reset requires email verification
4. Session tokens are encrypted
5. Regular security audits are performed

## Troubleshooting Common Issues
1. **Login Issues**
   - Verify email and password
   - Check user role permissions
   - Clear browser cache and cookies

2. **Password Reset**
   - Use the "Forgot Password" link
   - Check spam folder for reset emails
   - Contact admin if issues persist

## Best Practices
1. Regular password changes
2. Use unique passwords
3. Enable 2FA when available
4. Log out after each session
5. Don't share credentials

## Audit Trail
All user management actions are logged:
- User creation
- Role changes
- Login attempts
- Password changes
- Account deactivation
