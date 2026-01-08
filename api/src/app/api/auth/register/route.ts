import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';
import { ApiResponse, RegisterRequest } from '@/lib/types';

// Register new user
export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const { email, password, name } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email dan password harus diisi'
      }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email sudah terdaftar'
      }, { status: 409 });
    }

    // Hash password dan buat user baru
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { user, token },
      message: 'Registrasi berhasil'
    }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Terjadi kesalahan saat registrasi'
    }, { status: 500 });
  }
}