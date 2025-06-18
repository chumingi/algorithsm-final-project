import bcrypt from 'bcrypt';                   // 1. bcrypt 모듈 불러오기

const SALT_ROUNDS = 10;                        // 2. 해시 강도 설정

export async function hashPassword(             // 3. 비밀번호 해싱 함수
  plain: string
): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);      // 4. 입력된 문자열을 salt와 함께 해싱
}

export async function verifyPassword(           // 5. 비밀번호 검증 함수
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);          // 6. 입력과 해시 일치 여부 반환
}