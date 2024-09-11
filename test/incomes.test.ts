import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /incomes', () => {
it('Deve criar uma nova renda com sucesso', (done) => {
    chai.request(app)
    .post('/api/incomes')
    .send({
        userId: 'validUserId',
        titulo: 'Salário',
        valor: 5000,
        categoria: 'Salario',
        tipo: 'Mensal',
        data: '2024-01-01T00:00:00Z'
    })
    .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        done();
    });
});

it('Deve retornar erro ao tentar criar uma renda sem o campo "titulo"', (done) => {
    chai.request(app)
    .post('/api/incomes')
    .send({
        userId: 'validUserId',
        valor: 5000,
        categoria: 'Salario',
        tipo: 'Mensal',
        data: '2024-01-01T00:00:00Z'
    })
    .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('O campo titulo é obrigatório');
        done();
    });
});

it('Deve retornar erro ao tentar criar uma renda com valor negativo', (done) => {
    chai.request(app)
    .post('/api/incomes')
    .send({
        userId: 'validUserId',
        titulo: 'Salário',
        valor: -5000,
        categoria: 'Salario',
        tipo: 'Mensal',
        data: '2024-01-01T00:00:00Z'
    })
    .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('O valor deve ser positivo');
        done();
    });
});
});

describe('GET /incomes/:id', () => {
it('Deve retornar uma renda ao buscar com ID válido', (done) => {
    chai.request(app)
    .get('/api/incomes/validIncomeId')
    .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('titulo').eql('Salário');
        done();
    });
});

it('Deve retornar erro ao buscar uma renda com ID inexistente', (done) => {
    chai.request(app)
    .get('/api/incomes/inexistentIncomeId')
    .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').eql('Renda não encontrada');
        done();
    });
});

it('Deve retornar erro ao buscar uma renda com ID inválido', (done) => {
    chai.request(app)
    .get('/api/incomes/invalidId')
    .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('ID inválido');
        done();
    });
});
});

describe('PUT /incomes/:id', () => {

it('Deve atualizar uma renda existente com sucesso', (done) => {
    chai.request(app)
    .put('/api/incomes/validIncomeId')
    .send({
        titulo: 'Bônus',
        valor: 3000,
        categoria: 'Bonus',
        tipo: 'Anual',
        data: '2024-06-01T00:00:00Z'
    })
    .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('titulo').eql('Bônus');
        done();
    });
});


it('Deve retornar erro ao tentar atualizar uma renda inexistente', (done) => {
    chai.request(app)
    .put('/api/incomes/inexistentIncomeId')
    .send({
        titulo: 'Bônus',
        valor: 3000,
        categoria: 'Bonus',
        tipo: 'Anual',
        data: '2024-06-01T00:00:00Z'
    })
    .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').eql('Renda não encontrada');
        done();
    });
});


it('Deve retornar erro ao tentar atualizar uma renda sem o campo "titulo"', (done) => {
    chai.request(app)
    .put('/api/incomes/validIncomeId')
    .send({
        valor: 3000,
        categoria: 'Bonus',
        tipo: 'Anual',
        data: '2024-06-01T00:00:00Z'
    })
    .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('O campo titulo é obrigatório');
        done();
    });
});
});
