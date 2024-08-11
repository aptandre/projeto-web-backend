import { User } from "./user";

export interface Expense {
    id: number;
    userId: String;
    user: User;
    titulo: String;
    valor: number;
    categoria: Categoria;
    data: Date; 
}