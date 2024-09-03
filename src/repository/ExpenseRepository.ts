import { PrismaClient, Expense } from '@prisma/client';

const prisma = new PrismaClient();

export class ExpenseRepository {
  async create(data: Omit<Expense, 'id'>): Promise<Expense> {
    // User
    const user = await prisma.user.findUnique({
        where: { id: data.userId },
        include: { expenses: true },
    });

    // Quando o usuário não for encontrado, eu retorno um erro
    if (!user) {
        throw new Error(`O usuário com id ${data.userId} não foi encontrado.`);
    }

    // Defini o limite de 20 expenses para usuários normais
    const expensesLimit = 20;

    // Verifique se o usuário já atingiu o limite
    if (user.premium && user.expenses.length >= expensesLimit) {
        throw new Error(
          'Você atingiu o limite máximo de 20 gastos, faça o upgrade para continuar adicionando gastos ou exclua gastos existentes.'
        );
    } else {
      return prisma.expense.create({
        data,
      });
    }
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