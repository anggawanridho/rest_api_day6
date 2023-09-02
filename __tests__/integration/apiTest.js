const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const db = require('../../models/index');
const expect = chai.expect;

chai.use(chaiHttp);

let authToken;
describe('User Authentication API Tests', () => {
    before(async () => {
        
    });

    after(async () => {
        await db.user.destroy({
            where: {
                username: 'newuser'
            }
        });
    });

    it('should register a new user', async () => {
        const userData = {
            username: 'newuser',
            password: 'newpassword',
            role: 'admin'
        };

        const response = await chai
            .request(app)
            .post('/user/register')
            .send(userData);

        expect(response).to.have.status(201);
    });

    it('should handle registration of an existing user', async () => {
        const existingUserData = {
            username: 'newuser',
            password: 'newpassword',
            role: 'admin'
        };
    
        const response = await chai
            .request(app)
            .post('/user/register')
            .send(existingUserData);
    
        expect(response).to.have.status(409);
        expect(response.body).to.have.property('error').that.includes('User is already exist!');
    });

    it('should log in an existing user', async () => {
        const loginData = {
            username: 'newuser',
            password: 'newpassword'
        };

        const response = await chai
            .request(app)
            .post('/user/login')
            .send(loginData);

        expect(response).to.have.status(200);
        expect(response.body).to.have.property('token');
    });

    it('should not log in with incorrect credentials', async () => {
        const incorrectLoginData = {
            username: 'newuser',
            password: 'incorrectpassword'
        };
    
        const response = await chai
            .request(app)
            .post('/user/login')
            .send(incorrectLoginData);
    
        expect(response).to.have.status(401);
        expect(response.body).to.have.property('message', 'Authentication Failed, wrong password');
    });

});

describe('Book API test', () => {
    before(async () => {
        const userData = {
            username: 'bookadmin',
            password: 'bookadminpassword',
            role: 'admin'
        };

        await db.user.create(userData);

        const response = await chai
            .request(app)
            .post('/user/login')
            .send(userData);

        authToken = response.body.token;
    });

    after(async () => {
        await db.user.destroy({
            where: {
                username: 'bookadmin'
            }
        });
    });

    it('should create a book', async () => {
        const bookData = {
            idBuku: 'erika',
            namaBuku: 'Wir lieben die Demokratie',
            kategoriBuku: 'Party Anthem',
            deskripsiBuku: 'Auf der Heide blüht ein kleines Blümelein und das heißt, Erika.'
        };

        const response = await chai
            .request(app)
            .post('/api/book')
            .set('Authorization', `Bearer ${authToken}`)
            .send(bookData);

        expect(response).to.have.status(200);
        expect(response.body).to.have.property('idBuku');
    });

    it('should list all books', async() => {
        const response = await chai
            .request(app)
            .get('/api/book');
        
        expect(response).to.have.status(200);
    })

    it('should show book by id', async() => {
        const bookData = {
            idBuku: 'erika'
        }
        const response = await chai
            .request(app)
            .get(`/api/book/${bookData.idBuku}`);
        
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('namaBuku');
    })

    it('should edit book by id', async() => {
        let idBuku = 'erika';
        const bookData = {
            namaBuku: 'Wir lieben die Demokratie',
            kategoriBuku: 'Anthem',
            deskripsiBuku: 'Auf der Heide blüht ein kleines Blümelein und das heißt, Erika.'
        }
        const response = await chai
            .request(app)
            .put(`/api/book/${idBuku}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(bookData);
        
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Book updated successfully');
    })

    it('should delete a book', async () => {
        const bookData = {
            idBuku: 'erika'
        };

        const response = await chai
            .request(app)
            .delete(`/api/book/${bookData.idBuku}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Book deleted successfully');
    });
});