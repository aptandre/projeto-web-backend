import express from 'express';
import UserRoutes from './routes/UserRoutes';
import ExpenseRoutes from './routes/ExpenseRoutes';
import IncomeRoutes from './routes/IncomeRoutes';
import BudgetRoutes from './routes/BudgetRoutes';

const app = express();

app.use(express.json());

app.use('/api', UserRoutes);
app.use('/api', ExpenseRoutes);
app.use('/api', IncomeRoutes);
app.use('/api', BudgetRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
