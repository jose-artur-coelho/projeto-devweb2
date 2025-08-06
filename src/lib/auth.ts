import jwt from 'jsonwebtoken';
import { env } from '../utils/env';

export function generateToken(userId: string, role: string) {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, { expiresIn: '7d' });
}
export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}
