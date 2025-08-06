import express from 'express';
import usersRoutes from './routes/users.routes';
import { env } from './utils/env';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

const port = env.PORT;
app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
