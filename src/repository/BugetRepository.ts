import { PrismaClient, Budget } from '@prisma/client';

const prisma = new PrismaClient();

export class BudgetRepository {
  async create(data: Omit<Budget, 'id'>): Promise<Budget> {

    const user = await prisma.user.findUnique({
        where: { id: data.userId },
        include: { budgets: true },
    });

    // Quando o usuário não for encontrado, eu retorno um erro
    if (!user) {
        throw new Error(`O usuário com id ${data.userId} não foi encontrado.`);
    }

    // Defini o limite de 1 orçamento para usuários free
    const budgetLimit = 1;

    console.log("eh premium?")
    console.log(user.premium)
    // Verifique se o usuário já atingiu o limite
    if (!(user.premium) && user.budgets.length >= budgetLimit) {
        throw new Error(
          'Você atingiu o limite máximo de 1 orçamento, faça o upgrade para continuar adicionando orçamentos ou exclua orçamentos existentes.'
        );
    } else {
        return prisma.budget.create({
          data,
        });
    }

  }

  async findById(id: string): Promise<Budget | null> {
    const budget = await prisma.budget.findUnique({ where: { id } });
    
    if (!budget) {
      throw new Error(`Orçamento com id ${id} não foi encontrado.`);
    }
  
    return budget;
  }
  
  async findAllByUserId(userId: string): Promise<Budget[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error(`Usuário com id ${userId} não foi encontrado.`);
    }
  
    const budgets = await prisma.budget.findMany({ where: { userId } });
    return budgets;
  }
  
  async update(id: string, data: Partial<Budget>): Promise<Budget> {
    const budget = await prisma.budget.findUnique({ where: { id } });
    
    if (!budget) {
      throw new Error(`Orçamento com id ${id} não foi encontrado.`);
    }
  
    return prisma.budget.update({ where: { id }, data });
  }
  
  async delete(id: string): Promise<Budget> {
    const budget = await prisma.budget.findUnique({ where: { id } });
    
    if (!budget) {
      throw new Error(`Orçamento com id ${id} não foi encontrado.`);
    }
  
    return prisma.budget.delete({ where: { id } });
  }
  
}
