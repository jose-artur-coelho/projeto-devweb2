import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'adicionar verificação do .env';

export class authService {
  login(userId: string, role: string) {
    return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '1h' });
  }
  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
