import { getUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { NextResponse } from "next/server";

// fungsi untuk mendapatkan semua habit dari user yang terautentikasi
export async function GET(request: Request) {
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
    }
};