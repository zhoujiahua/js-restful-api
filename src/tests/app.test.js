import sinon from 'sinon';
import { app } from '@/app';
import { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/config/settings';

// eslint-disable-next-line no-undef
describe('User Authentication', () => {
  // eslint-disable-next-line no-undef
  describe('POST /api/register', () => {
    // eslint-disable-next-line no-undef
    it('should return 400 status code and error message when username or password is missing', async () => {
      const res = await request(app).post('/api/register').send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({
        message: 'Please provide both username and password',
      });
    });
    // eslint-disable-next-line no-undef
    it('should return 200 status code and success message when user is registered successfully', async () => {
      const res = await request(app).post('/api/register').send({
        username: 'testuser',
        password: 'testpassword',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({
        message: 'User registered successfully',
      });
    });
  });

  // eslint-disable-next-line no-undef
  describe('POST /api/login', () => {
    // eslint-disable-next-line no-undef
    it('should return 400 status code and error message when username or password is missing', async () => {
      const res = await request(app).post('/api/login').send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({
        message: 'Please provide both username and password',
      });
    });
    // eslint-disable-next-line no-undef
    it('should return 401 status code and error message when username or password is invalid', async () => {
      const res = await request(app).post('/api/login').send({
        username: 'invaliduser',
        password: 'invalidpassword',
      });
      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({ message: 'Invalid credentials' });
    });
    it('should return 200 status code and token when username and password are valid', async () => {
      const res = await request(app).post('/api/login').send({
        username: 'admin',
        password: 'admin',
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });

  // eslint-disable-next-line no-undef
  describe('GET /api/userinfo', () => {
    // eslint-disable-next-line no-undef
    it('should return 401 status code and error message when no token is provided', async () => {
      const res = await request(app).get('/api/userinfo');
      expect(res.status).to.equal(401);
      expect(res.body).to.be.empty;
    });
    // eslint-disable-next-line no-undef
    it('should return 403 status code when an invalid token is provided', async () => {
      const token = jwt.sign({ id: 1, username: 'admin' }, 'wrongsecret', {
        expiresIn: '1h',
      });
      const res = await request(app)
        .get('/api/userinfo')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(403);
      expect(res.body).to.be.empty;
    });
    // eslint-disable-next-line no-undef
    it('should return 200 status code and user info when a valid token is provided', async () => {
      const user = { id: 1, username: 'admin' };
      const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
      const res = await request(app)
        .get('/api/userinfo')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ id: user.id, username: user.username });
    });
  });
});
