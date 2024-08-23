import { Router } from 'express';
import { BudgetController } from '../controller/BugdetController';

const router = Router();
const budgetController = new BudgetController();

router.post('/budgets', budgetController.create.bind(budgetController));
router.get('/budgets/:id', budgetController.findById.bind(budgetController));
router.get('/users/:userId/budgets', budgetController.findAll.bind(budgetController));
router.put('/budgets/:id', budgetController.update.bind(budgetController));
router.delete('/budgets/:id', budgetController.delete.bind(budgetController));

export default router;
