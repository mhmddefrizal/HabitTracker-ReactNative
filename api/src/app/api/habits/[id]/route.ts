import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { ApiResponse, UpdateHabitRequest } from '@/lib/types';

// GET: Ambil habit berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    // fungsi untuk mendapatkan habit berdasarkan ID
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    const habit = await prisma.habit.findFirst({
      where: {
        id: params.id,
        userId: user.userId
      }
    });

    // periksa apakah habit ditemukan
    if (!habit) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Habit tidak ditemukan'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: habit
    }, { status: 200 });