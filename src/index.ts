import express from 'express';
import usersRoutes from './routes/users.routes';
import { env } from './utils/env';
import { globalErrorHandler } from './middlewares/global-error-handler.middleware';
import authRoutes from './routes/auth.routes';
import cowsRoutes from './routes/cows.routes';
import goatsRoutes from './routes/goats.routes';
import cowUpdatesRoutes from './routes/cow-updates.routes';
import goatUpdatesRoutes from './routes/goat-updates.routes';
import dailyCostsRoutes from './routes/daily-costs.routes';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/cows', cowsRoutes);
app.use('/goats', goatsRoutes);
app.use('/cow-updates', cowUpdatesRoutes);
app.use('/goat-updates', goatUpdatesRoutes);
app.use('/daily-costs', dailyCostsRoutes);

app.use(globalErrorHandler);

const port = env.PORT;
app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
