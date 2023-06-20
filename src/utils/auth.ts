import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS!),
  );
  return hashedPassword
}

export async function getToken(strategy: any, userData: any) {
  const data = userData
  const token = await jwt.sign(
    { data },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' },
  );
  return token;
}
