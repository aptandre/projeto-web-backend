import { Router } from 'express';
import { UserController } from '../controller/UserController';

const router = Router();
const userController = new UserController();

// Criar novo usuário
router.post('/register-new-user', (req, res) => userController.register(req, res));

// Pegar usuário por email
router.get('/get-user-by-email', (req, res) => userController.getUserByEmail(req, res));

// Pegar todos os usuários
router.get('/get-all-users', (req, res) => userController.getAllUsers(req, res));

// Atualizar um usuário
router.put('/update-user/:id', (req, res) => userController.updateUser(req, res));

// Deletar usuário por id
router.delete('/delete-user/:id', (req, res) => userController.deleteUser(req, res));

// Conceder ou remover premium a um usuário
router.patch('/premium/:id', (req, res) => userController.toggleUserPremium(req, res));
export default router;