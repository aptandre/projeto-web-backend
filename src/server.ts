import express from 'express';
import UserRoutes from './routes/UserRoutes';

const app = express();

app.use(express.json());

app.use('/users', UserRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
