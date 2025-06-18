import jwt from 'jsonwebtoken';                // 1. jsonwebtoken 모듈
import { User } from '@prisma/client';         // 2. Prisma User 타입

const SECRET = process.env.JWT_SECRET!;        // 3. .env에서 JWT 비밀키 로드

// 4. 페이로드로 사용자 id와 이메일만 담아 토큰 생성
export function signToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email },        // 5. 토큰에 담을 정보
    SECRET,                                    // 6. 서명 비밀키
    { expiresIn: '7d' }                        // 7. 유효기간 7일
  );
}

// 8. 토큰 검증 및 페이로드 반환
export function verifyToken(token: string): { id: number; email: string } {
  return jwt.verify(token, SECRET) as any;
}