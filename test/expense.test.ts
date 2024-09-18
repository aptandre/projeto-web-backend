import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { expect } from 'chai';
import { describe, it } from 'mocha';

chai.use(chaiHttp);

describe('Rotas de Expense', () => {
  // Teste para criar uma nova despesa
  describe('POST /expenses', () => {
    it('Deve criar uma nova despesa e retornar 201', (done) => {
      chai.request(app)
        .post('/expenses')
        .send({
          userId: 'userIdExemplo',
          titulo: 'Despesa de Alimentação',
          valor: 150.00,
          categoria: 'Alimentação',
          tipo: 'Fixo',
          data: new Date().toISOString()
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          done();
        });
    });

    it('Deve retornar 400 para requisições inválidas', (done) => {
      chai.request(app)
        .post('/expenses')
        .send({}) // Dados faltando
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // Teste para encontrar uma despesa por ID
  describe('GET /expenses/:id', () => {
    it('Deve retornar uma despesa válida para um ID existente', (done) => {
      chai.request(app)
        .get('/expenses/validExpenseId')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id', 'validExpenseId');
          done();
        });
    });

    it('Deve retornar 404 para um ID inexistente', (done) => {
      chai.request(app)
        .get('/expenses/invalidExpenseId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Teste para encontrar todas as despesas de um usuário
  describe('GET /users/:userId/expenses', () => {
    it('Deve retornar uma lista de despesas para um userId válido', (done) => {
      chai.request(app)
        .get('/users/validUserId/expenses')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Deve retornar 404 para um userId inexistente', (done) => {
      chai.request(app)
        .get('/users/invalidUserId/expenses')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Teste para atualizar uma despesa
  describe('PUT /expenses/:id', () => {
    it('Deve atualizar uma despesa existente e retornar 200', (done) => {
      chai.request(app)
        .put('/expenses/validExpenseId')
        .send({
          titulo: 'Despesa Atualizada',
          valor: 200.00,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Deve retornar 404 ao tentar atualizar uma despesa inexistente', (done) => {
      chai.request(app)
        .put('/expenses/invalidExpenseId')
        .send({
          titulo: 'Tentativa de Atualização',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Teste para deletar uma despesa
  describe('DELETE /expenses/:id', () => {
    it('Deve deletar uma despesa existente e retornar 204', (done) => {
      chai.request(app)
        .delete('/expenses/validExpenseId')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it('Deve retornar 404 ao tentar deletar uma despesa inexistente', (done) => {
      chai.request(app)
        .delete('/expenses/invalidExpenseId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});