import { PrismaClient, Income } from '@prisma/client';

const prisma = new PrismaClient();

export class IncomeRepository {
  async create(data: Omit<Income, 'id'>): Promise<Income> {
    const user = await prisma.user.findUnique({
        where: { id: data.userId },
        include: { incomes: true },
    });

    // Quando o usuário não for encontrado, eu retorno um erro
    if (!user) {
        throw new Error(`O usuário com id ${data.userId} não foi encontrado.`);
    }

    // Defini o limite de 10 ganhos para usuários free
    const incomesLimit = 10;

    // Verifique se o usuário já atingiu o limite
    if (user.premium && user.incomes.length >= incomesLimit) {
        throw new Error(
          'Você atingiu o limite máximo de 10 ganhos, faça o upgrade para continuar adicionando ganhos ou exclua ganhos existentes.'
        );
    } else {
        return prisma.income.create({
          data,
        });
    }
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
