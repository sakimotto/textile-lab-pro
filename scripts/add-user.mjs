import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for user input
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid = 
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar;

  if (!isValid) {
    console.log('\nPassword requirements:');
    console.log('- Minimum 8 characters');
    console.log('- Must contain uppercase letters');
    console.log('- Must contain lowercase letters');
    console.log('- Must contain numbers');
    console.log('- Must contain special characters\n');
  }

  return isValid;
}

async function createUser() {
  try {
    // Get user input
    const email = await question('Enter user email: ');
    const name = await question('Enter user name: ');
    const role = await question('Enter user role (ADMIN/TECHNICIAN/MANAGER/CLIENT): ');
    
    let password;
    let isPasswordValid = false;
    
    while (!isPasswordValid) {
      password = await question('Enter password: ');
      isPasswordValid = await validatePassword(password);
      if (!isPasswordValid) {
        console.log('Password does not meet requirements. Please try again.');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role: role.toUpperCase(),
      },
    });

    console.log('\nUser created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

// Run the script
createUser();
