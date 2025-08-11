import express from 'express';
import usersRoutes from './routes/users.routes';
import { env } from './utils/env';
import { globalErrorHandler } from './middlewares/global-error-handler.middleware';
import authRoutes from './routes/auth.routes';
import cowsRoutes from './routes/cows.routes';
import goatsRoutes from './routes/goats.routes';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/cows', cowsRoutes);
app.use('/goats', goatsRoutes);

app.use(globalErrorHandler);

const port = env.PORT;
app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
