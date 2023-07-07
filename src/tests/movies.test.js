const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

const URL_BASE = '/api/v1/movies';

let movieId;

test("POST -> 'URL_BASE' should return status code 201", async () => {
    const movie = {
        name: "Titanic",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 1996
    }
    const res = await request(app)
                .post(URL_BASE)
                .send(movie)
    movieId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(res.body.name)
})

test("GET -> 'URL_BASE' should return satus code 200", async() => {
    const res = await request(app)
                .get(URL_BASE)
    expect(res.status).toBe(200)
})

test("GET ONE -> 'URL_BASE' should return satus code 200", async() => {
    const res = await request(app)
                .get(`${URL_BASE}/${movieId}`)
    expect(res.status).toBe(200)
})

test("PUT -> 'URL_BASE' should return status code 200 and res.body.name === body.name", async() => {
    const movieBody = {
        name: "John Wick"
    }
    const res = await request(app)
                .put(`${URL_BASE}/${movieId}`)
                .send(movieBody)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movieBody.name)
})

test("POST -> 'URL_BASE' should return status code 201", async () => {
    const movie = {
        name: "Titanic",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 1996
    }
    const res = await request(app)
                .post(URL_BASE)
                .send(movie)
    movieId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(res.body.name)
})

test("POST -> 'URL_BASE/:id' should return status 201 and res.body.firstName === body.firstName", async() => {
    const actorBody = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "USA",
        image: "lorem10",
        birthday: "1974-06-12"
    }
   const actor = await Actor.create(actorBody)
  
    const movieBody = {
        name: "SAO",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 1995,
        actorId: actor.id
    }
    

    const res = await request(app)
                .post(URL_BASE)
                .send(movieBody)

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movieBody.name)
})

test("POST -> 'URL_BASE/:id' should return status code 201 and res.body.firstName must be equal to body.firstName",async() => {
    const directorBody = {
        firstName: "Ramiro",
        lastName: "Ramos",
        nationality: "Argentina",
        image: "lorem10",
        birthday: "1994-06-22"
    }

    const director = await Director.create(directorBody)

    const movieBody = {
        name: "SAO",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 1995,
        directorId: director.id
    }

    const res = await request(app)
                .post(URL_BASE)
                .send(movieBody)

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movieBody.name)
})

test("POST -> 'URL_BASE/:id' should return status code 201 and res.body.name must be equal to body.name",async() => {
    const genreBody = {
        name: "Romance"
    }
    const genre = await Genre.create(genreBody)

    const movieBody = {
        name: "En búsqueda de la felicidad",
        image: "lorem10",
        synopsis: "lorem20",
        releaseYear: 1995,
        genre: genre.id
    }

    const res = await request(app)
                .post(URL_BASE)
                .send(movieBody)
    expect(res.status).toBe(201)
    expect(res.body.name).toBe("En búsqueda de la felicidad")
})