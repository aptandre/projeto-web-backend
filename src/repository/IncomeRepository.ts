import { PrismaClient, Income } from '@prisma/client';

const prisma = new PrismaClient();

export class IncomeRepository {
  async create(data: Omit<Income, 'id'>): Promise<Income> {
    return prisma.income.create({ data });
  }

  async findById(id: string): Promise<Income | null> {
    return prisma.income.findUnique({ where: { id } });
  }

  async findAllByUserId(userId: string): Promise<Income[]> {
    return prisma.income.findMany({ where: { userId } });
  }

  async update(id: string, data: Partial<Income>): Promise<Income> {
    return prisma.income.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Income> {
    return prisma.income.delete({ where: { id } });
  }
}
