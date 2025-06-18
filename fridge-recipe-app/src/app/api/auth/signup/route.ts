import { NextResponse } from "next/server";          // 1. Next.js 13 App Router 응답 헬퍼
import { PrismaClient } from "@prisma/client";       // 2. Prisma 클라이언트
import { hashPassword } from "@/lib/password";       // 3. 비밀번호 해시 유틸

const prisma = new PrismaClient()                    // 4. DB 연결 인스턴스

export async function POST(req: Request) {
    const { email, password } = await req.json();    // 5. 요청 바디에서 이메일·비밀번호 추출

    // 6. 이미 존재하는 이메일인지 검사
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        return NextResponse.json(
            { error: '이미 가입된 이메일입니다.' },
            { status: 409 }
        );                                             // 7. 충돌 응답
    }
    const hashed = await hashPassword(password);       // 8. 비밀번호 해싱
    const user = await prisma.user.create({            // 9. 신규 사용자 생성
        data: { email, password: hashed },
    });

    return NextResponse.json(
        { id: user.id, email: user.email },
        { status: 201 }
    );                                                 // 10. 생성 완료 응답
}