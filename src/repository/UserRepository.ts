import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        incomes: true,
        expenses: true,
        budgets: true
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async deleteUser(id: string): Promise<User | null> {
    return prisma.user.delete({
      where: { id }
    })
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async togglePremiumUser(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (user == null) {
      return null;
    }

    return prisma.user.update({
      where: { id },
      data: { premium: !user.premium}
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    try {
      console.log(data);
      console.log("this time I want you you you")
      const updatedUser = await prisma.user.update({
        where: { id },
        data: data,
      });
      return updatedUser;
    } catch (error) {
      console.error("Ocorreu um erro ao atualizar os dados do usuário:", error);
      return null;
    }
  }
}