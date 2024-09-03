import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("to chegando aqui no authmiddleware")
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }
    console.log("to chegando aqui no 2")
    try {
        console.log("to chegando aqui no 3")

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error) {
        
        console.log("cheguei bem do aqui")
        res.status(400).json({ message: 'Token inválido.' });
    }
}