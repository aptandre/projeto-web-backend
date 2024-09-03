import { Request, Response } from 'express';
import { BudgetService } from '../service/BudgetService';

const budgetService = new BudgetService();

export class BudgetController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const budget = await budgetService.createBudget(req.body);
      res.status(201).json(budget);
    } catch (error) {
      const err = error as Error;
  
      if (err.message.includes('O usuário com id')) {
        res.status(404).json({ error: err.message });
      } else if (err.message.includes('Você atingiu o limite máximo')) {
        res.status(403).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const budget = await budgetService.getBudgetById(id);
      if (budget) {
        res.json(budget);
      } else {
        res.status(404).json({ message: 'Budget not found' });
      }
    } catch (error) {
        const err = error as Error;
    
        if (err.message.includes('O usuário com id')) {
          res.status(404).json({ error: err.message });
        } else if (err.message.includes('Você atingiu o limite máximo')) {
          res.status(403).json({ error: err.message });
        } else {
          res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const budgets = await budgetService.getAllBudgets(userId);
      res.json(budgets);
    } catch (error) {
      const err = error as Error;
    
      if (err.message.includes('O usuário com id')) {
        res.status(404).json({ error: err.message });
      } else if (err.message.includes('Você atingiu o limite máximo')) {
        res.status(403).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedBudget = await budgetService.updateBudget(id, req.body);
      res.json(updatedBudget);
    } catch (error) {
      const err = error as Error;
    
      if (err.message.includes('O usuário com id')) {
        res.status(404).json({ error: err.message });
      } else if (err.message.includes('Você atingiu o limite máximo')) {
        res.status(403).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await budgetService.deleteBudget(id);
      res.status(204).send();
    } catch (error) {
      const err = error as Error;
    
      if (err.message.includes('O usuário com id')) {
        res.status(404).json({ error: err.message });
      } else if (err.message.includes('Você atingiu o limite máximo')) {
        res.status(403).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    }
  }
}
