import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { authenticateToken } from '../middlewares/AuthMiddleware';  // Import the middleware

const router = Router();
const userController = new UserController();

router.post('/login', (req, res) => userController.login(req, res));

// Criar novo usuário PUBLIC
router.post('/register-new-user', (req, res) => userController.register(req, res));

// Pegar usuário por email PUBLIC
router.get('/get-user-by-email', (req, res) => userController.getUserByEmail(req, res));

// Pegar usuário por id PRIV
router.get('/get-user-by-id/:id', authenticateToken, (req, res) => userController.getUserById(req, res));

// Pegar todos os usuários PRIV
router.get('/get-all-users', authenticateToken, (req, res) => userController.getAllUsers(req, res));

// Atualizar um usuário PRIV
router.put('/update-user/:id', authenticateToken, (req, res) => userController.updateUser(req, res));

// Deletar usuário por id PRIV
router.delete('/delete-user/:id', authenticateToken, (req, res) => userController.deleteUser(req, res));

// Conceder ou remover premium a um usuário PRIV
router.patch('/premium/:id', authenticateToken, (req, res) => userController.toggleUserPremium(req, res));

export default router;
