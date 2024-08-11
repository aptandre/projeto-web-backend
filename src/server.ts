import express, { Request, Response } from 'express';
import { Expense } from './models/expense';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

let expenses: Expense[] = [];
let id = 1;
/*
--- Entidades das rotas ---
1. Gastos
2. Ganhos
3. Orçamentos
4. Perfil do usuário
5. Login
* */

// CRUD USER
app.post('/user')
app.get('/user/:id')
app.put('/user')
app.patch('/user/:id')
app.delete('/user/:id')

// CRUD BUDGET
app.post('/budget')
app.get('/budget/:id')
app.put('/budget')
app.patch('/budget/:id')
app.delete('/budget/:id')

// CRUD INCOMES
app.post('/income')
app.get('/income/:id')
app.put('/income')
app.patch('/income/:id')
app.delete('/income/:id')

// CRUD EXPENSES
app.post('/expenses')
app.get('/expenses/:id')
app.put('/expenses')
app.patch('/expenses/:id')
app.delete('/expenses/:id')
// app.post('/expenses', (req, res) => {
//     const { title, amount } = req.body;
//     const date: string = new Date().toDateString();
//     const newExpense: Expense = {id: id += 1, title, amount, date}
//     expenses.push(newExpense);
//     res.status(201).json(newExpense)
// });

// app.get('/expenses', (req: Request, res: Response) => {
//     res.status(200).json(expenses)
// });

// app.put('/expenses/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, amount, date } = req.body;
//     const expenseIndex = expenses.findIndex(expense => expense.id === id);
//     if (expenseIndex === -1) {
//         res.status(404).send('Gasto não encontrado.')
//     }
//     expenses[expenseIndex] = {id, title, amount, date}
//     res.status(200).json(expenses[expenseIndex])
//  })

// app.delete('/expenses/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     expenses = expenses.filter(expense => expense.id != id);
//     res.status(204).send();
// })