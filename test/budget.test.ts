import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { expect } from 'chai';
import { describe, it } from 'mocha';

chai.use(chaiHttp);

describe('Rotas de Budget', () => {
  // Teste para criar um novo budget
  describe('POST /budgets', () => {
    it('Deve criar um novo budget e retornar 201', (done) => {
      chai.request(app)
        .post('/budgets')
        .send({
          titulo: 'Orçamento Mensal',
          description: 'Orçamento para despesas do mês',
          userId: 'userIdExemplo'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          done();
        });
    });

    it('Deve retornar 400 para requisições inválidas', (done) => {
      chai.request(app)
        .post('/budgets')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // Teste para encontrar um budget por ID
  describe('GET /budgets/:id', () => {
    it('Deve retornar um budget válido para um ID existente', (done) => {
      chai.request(app)
        .get('/budgets/validBudgetId')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id', 'validBudgetId');
          done();
        });
    });

    it('Deve retornar 404 para um ID inexistente', (done) => {
      chai.request(app)
        .get('/budgets/invalidBudgetId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Teste para encontrar todos os budgets de um usuário
  describe('GET /users/:userId/budgets', () => {
    it('Deve retornar uma lista de budgets para um userId válido', (done) => {
      chai.request(app)
        .get('/users/validUserId/budgets')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Deve retornar 404 para um userId inexistente', (done) => {
      chai.request(app)
        .get('/users/invalidUserId/budgets')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Teste para atualizar um budget
  describe('PUT /budgets/:id', () => {
    it('Deve atualizar um budget existente e retornar 200', (done) => {
      chai.request(app)
        .put('/budgets/validBudgetId')
        .send({
          titulo: 'Orçamento Atualizado',
          description: 'Descrição atualizada',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Deve retornar 404 ao tentar atualizar um budget inexistente', (done) => {
      chai.request(app)
        .put('/budgets/invalidBudgetId')
        .send({
          titulo: 'Tentativa de Atualização',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Teste para deletar um budget
  describe('DELETE /budgets/:id', () => {
    it('Deve deletar um budget existente e retornar 204', (done) => {
      chai.request(app)
        .delete('/budgets/validBudgetId')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it('Deve retornar 404 ao tentar deletar um budget inexistente', (done) => {
      chai.request(app)
        .delete('/budgets/invalidBudgetId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});