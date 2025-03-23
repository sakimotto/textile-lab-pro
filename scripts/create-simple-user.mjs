import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Simple test password
  const password = 'test123';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      hashedPassword: hashedPassword
    },
    create: {
      email: 'test@example.com',
      hashedPassword,
      name: 'Test User',
      role: 'USER',
    },
  });

  console.log('Updated test user with new password:', {
    email: user.email,
    password: password, // Only logging for testing
    hashedPassword: user.hashedPassword
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
