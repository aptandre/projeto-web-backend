import { Router } from 'express';
import { IncomeController } from '../controller/IncomeController';

const router = Router();
const incomeController = new IncomeController();

router.post('/incomes', incomeController.create.bind(incomeController));
router.get('/incomes/:id', incomeController.findById.bind(incomeController));
router.get('/users/:userId/incomes', incomeController.findAll.bind(incomeController));
router.put('/incomes/:id', incomeController.update.bind(incomeController));
router.delete('/incomes/:id', incomeController.delete.bind(incomeController));

export default router;
