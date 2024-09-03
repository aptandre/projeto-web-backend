import { BudgetRepository } from '../repository/BugetRepository';
import { Budget } from '@prisma/client';

const budgetRepository = new BudgetRepository();

export class BudgetService {
  async createBudget(data: Omit<Budget, 'id'>): Promise<Budget> {
    try {
      return await budgetRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getBudgetById(id: string): Promise<Budget | null> {
    return budgetRepository.findById(id);
  }

  async getAllBudgets(userId: string): Promise<Budget[]> {
    return budgetRepository.findAllByUserId(userId);
  }

  async updateBudget(id: string, data: Partial<Budget>): Promise<Budget> {
    return budgetRepository.update(id, data);
  }

  async deleteBudget(id: string): Promise<Budget> {
    return budgetRepository.delete(id);
  }
}
