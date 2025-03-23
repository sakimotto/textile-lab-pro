// Script to create a test user for development
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    if (existingUser) {
      console.log('Test user already exists:');
      console.log({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create test user with direct database query to ensure compatibility
    const user = await prisma.$queryRaw`
      INSERT INTO "User" (
        id, 
        email, 
        name, 
        "hashedPassword", 
        role, 
        "createdAt", 
        "updatedAt"
      ) 
      VALUES (
        ${`usr_${Date.now()}`}, 
        ${'test@example.com'}, 
        ${'Test User'}, 
        ${hashedPassword}, 
        ${'ADMIN'}, 
        ${new Date()}, 
        ${new Date()}
      )
      RETURNING id, email, name, role
    `;

    console.log('Test user created successfully:');
    console.log(user[0]);
    
    console.log('\nLogin credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
