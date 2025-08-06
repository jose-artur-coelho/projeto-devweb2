import express from 'express';
import usersRoutes from './routes/users.routes';
import { env } from './utils/env';
import { globalErrorHandler } from './middlewares/global-error-handler.middleware';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

app.use(globalErrorHandler);

const port = env.PORT;
app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
