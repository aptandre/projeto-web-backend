import { ExpenseRepository } from '../repository/ExpenseRepository';
import { Expense } from '@prisma/client';

const expenseRepository = new ExpenseRepository();

export class ExpenseService {
  async createExpense(data: Omit<Expense, 'id'>): Promise<Expense> {
    return expenseRepository.create(data);
  }

  async getExpenseById(id: string): Promise<Expense | null> {
    return expenseRepository.findById(id);
  }

  async getAllExpenses(userId: string): Promise<Expense[]> {
    return expenseRepository.findAllByUserId(userId);
  }

  async updateExpense(id: string, data: Partial<Expense>): Promise<Expense> {
    return expenseRepository.update(id, data);
  }

  async deleteExpense(id: string): Promise<Expense> {
    return expenseRepository.delete(id);
  }
}
