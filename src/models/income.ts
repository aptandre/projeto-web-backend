import { User } from "./user";

export interface Income {
    id: String,
    userId: String,
    user: User,
    titulo: String,
    valor: number,
    categoria: Categoria,
    tipo: String,
    data: Date
}