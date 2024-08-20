import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { User } from '@prisma/client';


export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'Este email já foi cadastrado.' });
        return;
      }

      const user = await this.userService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar registrar o usuário', error });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;

      const user = await this.userService.getUserByEmail(email);
      if (user == null) {
        res.status(404).json({message: 'Usuário não foi encontrado.'})
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: `Ocorreu um erro no servidor ao tentar encontrar o usuário. ${error}`})
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedUser = await this.userService.deleteUser(id);
      if (deletedUser == null) {
        res.status(404).json({message: 'O usuário com este id não foi encontrado.'});
      }
      res.status(200).json({message: `O usuário de id ${id} foi deletado com sucesso.`});
      
    } catch (error) {
      res.status(500).json({ message: `Ocorreu um erro no servidor ao tentar deletar o usuário. ${error}`});
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: `Ocorreu um erro no servidor ao tentar deletar o usuário. ${error}`});
    }
  }

  async toggleUserPremium(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.userService.togglePremiumUser(id);
      if (user == null) {
        res.status(404).json({message: 'O usuário com este id não foi encontrado.'});
      }
      res.status(200).json({message: `O usuário de id ${id} tornou-se premium com sucesso.`});
    } catch (error) {
      res.status(500).json({ message: `Ocorreu um erro no servidor ao tentar realizar a operação de premium no usuário. ${error}`});
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userData: Partial<User> = req.body;

    try {
      const updatedUser = await this.userService.updateUser(id, userData);

      if (updatedUser == null) {
        res.status(404).json({ message: 'Erro: Usuário não encontrado' });
        return;
      }

      res.status(200).json({ message: 'Dados do usuário foram atualizados com sucesso!', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro ao tentar atualizar o usuário.', error });
    }
  }
}
