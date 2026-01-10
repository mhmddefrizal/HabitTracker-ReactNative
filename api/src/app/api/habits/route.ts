
import { getUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { NextResponse, NextRequest } from "next/server";

// fungsi untuk mendapatkan semua habit dari user yang terautentikasi
export async function GET(request: NextRequest) {
    try {
        const user = getUserFromRequest(request);

        // periksa apakah user ada
        if (!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: "Unauthorized, token tidak valid / tidak ada",
            }, { status: 401 });
        }

        // ambil semua habit dari database berdasarkan userId
        const habits = await prisma.habit.findMany({
            where: { userId: user.userId },
            orderBy: { createdAt: "desc" },
        });

        // kembalikan response dengan data habits
        return NextResponse.json<ApiResponse>({
            success: true,
            data: habits
        }, { status: 200 });
        
        // untuk menangani error
    } catch (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            error: "Terjadi kesalahan saat mengambil data habits"
        }, { status: 500 });
    }
};

// fungsi untuk menambahkan habit baru untuk user yang terautentikasi