
const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  it('should reject invalid login', async () => {
    const res = await request('http://localhost:5000')
      .post('/login')
      .send({ username: 'bad', password: 'user' });
    expect(res.statusCode).toBe(401);
  });

  it('should allow valid login', async () => {
    const res = await request('http://localhost:5000')
      .post('/login')
        .send({ username: 'admin', password: '123' });
    expect(res.statusCode).toBe(200);
  });

  it('should create, update, and delete an item', async () => {
    let res = await request('http://localhost:5000')
      .post('/items')
      .send({ name: 'Test Item' });
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    res = await request('http://localhost:5000')
      .put(`/items/${id}`)
      .send({ name: 'Updated Item' });
    expect(res.body.name).toBe('Updated Item');

    res = await request('http://localhost:5000')
      .delete(`/items/${id}`);
    expect(res.statusCode).toBe(204);
  });
});
