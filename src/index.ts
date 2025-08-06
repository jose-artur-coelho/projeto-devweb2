import express from 'express';
import usersRoutes from './routes/users.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/users', usersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});
