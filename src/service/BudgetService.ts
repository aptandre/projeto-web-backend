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
    try {
      return budgetRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllBudgets(userId: string): Promise<Budget[]> {
    try {
      return budgetRepository.findAllByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateBudget(id: string, data: Partial<Budget>): Promise<Budget> {
    try {
      return budgetRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteBudget(id: string): Promise<Budget> {
    try {
      return budgetRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
