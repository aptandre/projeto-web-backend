import { Request, Response } from 'express';
import { ExpenseService } from '../service/ExpenseService';

const expenseService = new ExpenseService();

export class ExpenseController {
  async createExpense(req: Request, res: Response): Promise<Response> {
    try {
      const expense = await expenseService.createExpense(req.body);
      return res.status(201).json(expense);
    } catch (error) {
      return res.status(500).json({ message: "erro" });
    }
  }

  async getExpenseById(req: Request, res: Response): Promise<Response> {
    try {
      const expense = await expenseService.getExpenseById(req.params.id);
      if (!expense) return res.status(404).json({ message: 'Expense not found' });
      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).json({ message: "erro" });
    }
  }

  async getAllExpenses(req: Request, res: Response): Promise<Response> {
    try {
      const expenses = await expenseService.getAllExpenses(req.params.userId);
      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({ message: "erro" });
    }
  }

  async updateExpense(req: Request, res: Response): Promise<Response> {
    try {
      const expense = await expenseService.updateExpense(req.params.id, req.body);
      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).json({ message: "erro" });
    }
  }

  async deleteExpense(req: Request, res: Response): Promise<Response> {
    try {
      const expense = await expenseService.deleteExpense(req.params.id);
      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).json({ message: "erro" });
    }
  }
}
