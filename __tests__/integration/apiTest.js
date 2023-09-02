const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const db = require('../../models/index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Authentication API Tests', () => {
    let authToken;

    before(async () => {
        const userData = {
            username: 'testuser',
            password: 'testpassword',
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
                username: 'testuser'
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
            username: 'testuser',
            password: 'testpassword'
        };

        const response = await chai
            .request(app)
            .post('/user/register')
            .send(existingUserData);

        expect(response).to.have.status(500);
    });

    it('should log in an existing user', async () => {
        const loginData = {
            username: 'testuser',
            password: 'testpassword'
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
            username: 'testuser',
            password: 'incorrectpassword'
        };

        const response = await chai
            .request(app)
            .post('/user/login')
            .send(incorrectLoginData);

        expect(response).to.have.status(401);
    });

    it('should log out a user', async () => {
        const response = await chai
            .request(app)
            .post('/user/logout')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Logged out successfully');
    });
});
