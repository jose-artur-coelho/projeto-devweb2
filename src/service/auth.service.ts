import { passwordManager } from '../lib/password-manager';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "adicionar verificação do .env";


export class authService {
  generateToken(userId:string, role: )
}

export const generateToken = (userId: number, username: string): string => {
  return jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: '1h' });
};

// Função para verificar um token JWT

export const verifyToken = (token: string): any => {
  re
