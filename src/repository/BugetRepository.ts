import { PrismaClient, Budget } from '@prisma/client';

const prisma = new PrismaClient();

export class BudgetRepository {
  async create(data: Omit<Budget, 'id'>): Promise<Budget> {
    return prisma.budget.create({ data });
  }

  async findById(id: string): Promise<Budget | null> {
    return prisma.budget.findUnique({ where: { id } });
  }

  async findAllByUserId(userId: string): Promise<Budget[]> {
    return prisma.budget.findMany({ where: { userId } });
  }

  async update(id: string, data: Partial<Budget>): Promise<Budget> {
    return prisma.budget.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Budget> {
    return prisma.budget.delete({ where: { id } });
  }
}
