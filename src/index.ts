import express from 'express';
import usersRoutes from './routes/users.routes';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

const port = 3000;
app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
