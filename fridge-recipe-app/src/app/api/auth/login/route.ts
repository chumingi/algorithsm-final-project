import { NextResponse } from 'next/server';          // 1. Next 헬퍼
import { PrismaClient } from '@prisma/client';       // 2. Prisma
import { verifyPassword } from '@/lib/password';     // 3. 비밀번호 검증
import { signToken } from '@/lib/jwt';               // 4. JWT 발급 유틸

const prisma = new PrismaClient();                   // 5. DB 인스턴스

export async function POST(req: Request) {
  const { email, password } = await req.json();      // 6. 바디에서 추출

  const user = await prisma.user.findUnique({        // 7. 사용자 조회
    where: { email },
  });
  if (!user) {
    return NextResponse.json(
      { error: '회원정보가 없습니다.' },
      { status: 404 }
    );                                               // 8. 없음 응답
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { error: '비밀번호가 일치하지 않습니다.' },
      { status: 401 }
    );                                               // 9. 인증 실패
  }

  const token = signToken(user);                     // 10. JWT 발급
  // 11. 토큰을 쿠키 또는 바디에 담아 반환(여기선 바디)
  return NextResponse.json({ token, email: user.email });
}