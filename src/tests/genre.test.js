const request = require('supertest');
const app = require('../app');

const URL_BASE = '/api/v1/genres';

let genreId;

test("POST -> 'URL_BASE' should return status 201", async() => {
    const genre = {
        name: "Suspense"
    }
    const res = await request(app)
                .post(URL_BASE)
                .send(genre)
    genreId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(res.body.name)
})

test("GET ALL -> 'URL_BASE' should return status code 200", async() => {
    const res = await request(app)
                .get(URL_BASE)
    expect(res.status).toBe(200)
})

test("GET ONE -> 'URL_BASE' should return status code 200", async() => {
    const res = await request(app)
                .get(`${URL_BASE}/${genreId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(res.body.name)
})

test("PUT -> 'URL_BASE' should return status code 200 and res.body.name must be equal to updatedObject.name", async() => {
    const genreUpdated = {
        name: "Fantasy"
    }
    const res = await request(app)
                .put(`${URL_BASE}/${genreId}`)
                .send(genreUpdated)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(res.body.name)
})

test("DELETE -> 'URL_BASE' should return status code 204", async() => {
    const res = await request(app)
                    .delete(`${URL_BASE}/${genreId}`)
    expect(res.status).toBe(204)
})