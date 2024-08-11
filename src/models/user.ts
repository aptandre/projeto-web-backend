import { Income } from "./income";
import { Expense } from "./expense";
import { Budget } from "./budget";

export interface User {
    id: String,
    name: String,
    premium: Boolean,
    email: String,
    incomes: Income[],
    expenses: Expense[],
    budgets: Budget[]
}