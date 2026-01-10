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

    // handling ketika terjadi error
    } catch (error) {
    console.error('Get habit error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Terjadi kesalahan saat mengambil data habit'
    }, { status: 500 });
  }
}

// PUT: Update habit
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const body: UpdateHabitRequest = await request.json();
    // Cek apakah habit milik user
    const existingHabit = await prisma.habit.findFirst({
      where: {
        id: params.id,
        userId: user.userId
      }
    });

    if (!existingHabit) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Habit tidak ditemukan'
      }, { status: 404 });
    }

    // Update habit
    const updatedHabit = await prisma.habit.update({
      where: { id: params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.frequency && { frequency: body.frequency }),
        ...(body.targetCount !== undefined && { targetCount: body.targetCount })
      }
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: updatedHabit,
      message: 'Habit berhasil diupdate'
    }, { status: 200 });

    // untuk menangani error
    } catch (error) {
    console.error('Update habit error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Terjadi kesalahan saat mengupdate habit'
    }, { status: 500 });
  }
}

// DELETE: Hapus habit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Cek apakah habit milik user
    const existingHabit = await prisma.habit.findFirst({
      where: {
        id: params.id,
        userId: user.userId
      }
    });

    if (!existingHabit) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Habit tidak ditemukan'
      }, { status: 404 });
    }