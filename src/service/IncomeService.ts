import { IncomeRepository } from '../repository/IncomeRepository';
import { Income } from '@prisma/client';

const incomeRepository = new IncomeRepository();

export class IncomeService {
  async createIncome(data: Omit<Income, 'id'>): Promise<Income> {
    return incomeRepository.create(data);
  }

  async getIncomeById(id: string): Promise<Income | null> {
    return incomeRepository.findById(id);
  }

  async getAllIncomes(userId: string): Promise<Income[]> {
    return incomeRepository.findAllByUserId(userId);
  }

  async updateIncome(id: string, data: Partial<Income>): Promise<Income> {
    return incomeRepository.update(id, data);
  }

  async deleteIncome(id: string): Promise<Income> {
    return incomeRepository.delete(id);
  }
}
