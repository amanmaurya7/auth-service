import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  // Hardcoded values for testing
  const password = "password123";
  const email = "unique_email@example.com"; // Change this to a unique email


  // Check for empty email or password
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  try {
    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error); // Log the full error
    return NextResponse.json({ error: 'User creation failed', details: error.message }, { status: 500 });
  }
}
