import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin credentials
  const email = 'admin@textilelab.com';
  const password = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      hashedPassword: hashedPassword,
      role: 'Admin'
    },
    create: {
      email,
      hashedPassword,
      name: 'Admin User',
      role: 'Admin',
    },
  });

  console.log('Created/Updated admin user:', {
    email: user.email,
    password: password, // Only logging for setup purposes
    role: user.role
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
