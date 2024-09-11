import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { expect } from 'chai';
import { describe, it } from 'mocha';

chai.use(chaiHttp);

describe('POST /register-new-user', () => {
  it('Deve registrar um novo usuário', (done) => {
    chai.request(app)
      .post('/register-new-user')
      .send({
        name: 'Evelynn',
        email: 'evelynn@kda.com.br',
        password: 'eve',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Retornar um 400 para emaisl inválidos', (done) => {
    chai.request(app)
      .post('/register-new-user')
      .send({
        name: 'Usuariana',
        email: 'oi',
        password: 'senha',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('POST /login', () => {
  it('Precisa retornar um token de autenticação e um status 200', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'mueteste@gmail.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('Deve retornar um 401 para senhas erradas.', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'mueteste@gmail.com',
        password: 'senha',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('GET /get-user-by-email', () => {
    it('Deve retornar um usuário válido', (done) => {
      chai.request(app)
        .get('/get-user-by-email')
        .query({ email: 'meuteste@gmail.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('email', 'meuteste@gmail.com');
          done();
        });
    });
  
it('deve retornar 404 para emails não existentes.', (done) => {
chai.request(app)
    .get('/get-user-by-email')
    .query({ email: 'querida@gmail.com' })
    .end((err, res) => {
    expect(res).to.have.status(404);
    done();
    });
});
});
  
  describe('GET /get-user-by-id/:id', () => {
    it('Deve retornar um status 200 e o usuário para um ID válido', (done) => {
      chai.request(app)
        .get('/get-user-by-id/validUserId')
        .set('Authorization', 'Bearer algumtoken')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id', 'validUserId');
          done();
        });
    });
  
    it('Precisa retornar 404 quando não encontrar o usuário com esse ID.', (done) => {
      chai.request(app)
        .get('/get-user-by-id/invalidUserId')
        .set('Authorization', 'Bearer algumtokennaoseitestarisso')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  
