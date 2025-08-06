import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string('propriedade PORT não foi encontrada.').transform(Number),
  DATABASE_URL: z.url('Propriedade DATABASE_URL não foi encontrada.'),
  JWT_SECRET: z.string('Propriedade JWT_SECRET não foi encontrada'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    ' Erro na validação das variáveis de ambiente:',
    _env.error.issues
  );
  process.exit(1);
}

export const env = _env.data;
