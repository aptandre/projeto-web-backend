import { PrismaClient, Expense } from '@prisma/client';

const prisma = new PrismaClient();

export class ExpenseRepository {
  async create(data: Omit<Expense, 'id'>): Promise<Expense> {
    return prisma.expense.create({ data });
  }

  async findById(id: string): Promise<Expense | null> {
    return prisma.expense.findUnique({ where: { id } });
  }

  async findAllByUserId(userId: string): Promise<Expense[]> {
    return prisma.expense.findMany({ where: { userId } });
  }

  async update(id: string, data: Partial<Expense>): Promise<Expense> {
    return prisma.expense.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Expense> {
    return prisma.expense.delete({ where: { id } });
  }
}