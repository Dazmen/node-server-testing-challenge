const request = require('supertest');
const server = require('../server.js');

describe('auth router', function(){
    it('should run the tests', function(){
        expect(true).toBe(true);
    })

    describe('register /POST', function(){
        it('should return 201 create', function(){
           return request(server)
                .post('/api/auth/register')
                .send({
                    username: 'testing1',
                    password: 'tests'
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })

    describe('login /POST', function(){
       it('Should return a token', function(){
           return request(server)
               .post('/api/auth/login')
               .send({
                   username: 'testing',
                   password: 'tests'
               })
               .then(res => {
                   expect(res.body.token).toBeDefined()
               })
       })
       it('should return 200 OK', function() {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testing',
                    password: 'tests'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
       })
    })

    describe('GET users', function(){
        it('should return status 200 OK', function(){
            return request(server)
                .get('/api/auth/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('should return an array', function(){
            return request(server)
                .get('/api/auth/')
                .then(res => {
                    expect(Array.isArray(res.body)).toBe(true);
                })
        })
        it('should return JSON formatted body', function(){
            return request(server)
                .get('/api/auth/')
                .then(res => {
                    expect(res.type).toMatch(/json/);
                })
        })
    })
});