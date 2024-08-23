import { Request, Response } from 'express';
import { IncomeService } from '../service/IncomeService';

const incomeService = new IncomeService();

export class IncomeController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const income = await incomeService.createIncome(req.body);
      res.status(201).json(income);
    } catch (error) {
      res.status(500).json({ error: "erro" });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const income = await incomeService.getIncomeById(id);
      if (income) {
        res.json(income);
      } else {
        res.status(404).json({ message: 'Income not found' });
      }
    } catch (error) {
      res.status(500).json({ error: "erro" });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const incomes = await incomeService.getAllIncomes(userId);
      res.json(incomes);
    } catch (error) {
      res.status(500).json({ error: "erro" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedIncome = await incomeService.updateIncome(id, req.body);
      res.json(updatedIncome);
    } catch (error) {
      res.status(500).json({ error: "erro" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await incomeService.deleteIncome(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "erro" });
    }
  }
}
