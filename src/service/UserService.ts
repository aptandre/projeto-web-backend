import { UserRepository } from '../repository/UserRepository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      premium: false,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userRepository.deleteUser(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async togglePremiumUser(id: string): Promise<User | null> {
    return this.userRepository.togglePremiumUser(id);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);

    return this.userRepository.updateUser(id, userData);
  }

}
