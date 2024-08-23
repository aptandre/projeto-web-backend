import { Router } from 'express';
import { ExpenseController } from '../controller/ExpenseController';

const router = Router();
const expenseController = new ExpenseController();

router.post('/expenses', expenseController.createExpense);
router.get('/expenses/:id', expenseController.getExpenseById);
router.get('/users/:userId/expenses', expenseController.getAllExpenses);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

export default router;
