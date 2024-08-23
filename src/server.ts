import express from 'express';
import UserRoutes from './routes/UserRoutes';
import ExpenseRoutes from './routes/ExpenseRoutes';

const app = express();

app.use(express.json());

app.use('/users', UserRoutes);
app.use('/expenses', ExpenseRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
