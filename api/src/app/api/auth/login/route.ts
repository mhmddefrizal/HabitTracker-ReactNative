import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';
import { ApiResponse, LoginRequest } from '@/lib/types';

// fungsi untuk login user
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email dan password harus diisi'
      }, { status: 400 });
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email atau password salah'
      }, { status: 401 });
    }

    // Verifikasi password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email atau password salah'
      }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    // Return user data tanpa password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { 
        user: userWithoutPassword, 
        token 
      },
      message: 'Login berhasil'
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Terjadi kesalahan saat login'
    }, { status: 500 });
  }
}