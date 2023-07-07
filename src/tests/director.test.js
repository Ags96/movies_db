const request = require('supertest');
const app = require('../app');

let directorId;

const URL_BASE = '/api/v1/directors';

test("POST -> 'URL_BASE' should return status code 201", async() => {
    const director = {
        firstName: "Agus",
        lastName: "Seoane",
        nationality: "Argentina",
        image: "lorem12" ,
        birthday: "1996-06-22" 
    }

    const res = await request(app)
                .post(URL_BASE)
                .send(director)

    directorId = res.body.id;

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(res.body.name)
})

test("GET -> 'URL_BASE' should return satus code 200", async() => {
    const res = await request(app)
                .get(URL_BASE)
    expect(res.status).toBe(200)
})

test("GET ONE -> 'URL_BASE' should return status code 200", async() => {
    const res = await request(app)
                .get(`${URL_BASE}/${directorId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(res.body.name)
})

test("PUT -> 'URL_BASE' should return status code 200 and res.body.name must be equal to updatedObject.name", async() => {
    const director = {
        firstName: "John"
    }
    const res = await request(app)
                .put(`${URL_BASE}/${directorId}`)
                .send(director)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("John") 
})

test("DELETE -> 'URL_BASE' should return status code 204", async() => {
    const res = await request(app)
                .delete(`${URL_BASE}/${directorId}`)
    expect(res.status).toBe(204)
})