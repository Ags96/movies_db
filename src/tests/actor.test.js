const request = require('supertest');
const app = require('../app');

const URL_BASE = '/api/v1/actors';

let actorId;

test("POST -> 'URL' should return status code 201 and res.body.firstName must be equal to body.name ",
async() => {

    const actor = {
        firstName:"Agus",
        lastName:"Seoane",
        nationality:"Argentina",
        image:"lorem10",
        birthday:"1996-06-22"
    }

    const res = await request(app)
                .post(URL_BASE)
                .send(actor)
    
    actorId = res.body.id;
    expect(res.status).toBe(201)            
    expect(res.body.firstName).toBe(actor.firstName)
    
});

test("GET -> 'URL_BASE' should return status code 200", async() => {
    const res = await request(app)
                .get(URL_BASE)
    expect(res.status).toBe(200)
});

test("GET ONE -> 'URL_BASE' should return status code 200", async() =>{

    const res = await request(app)
                .get(`${URL_BASE}/${actorId}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Agus")
})

test("PUT -> 'URL_BASE' should return status code 200 and res.body.firstName must be equal to objectUpdated.firstName", async() => {
    const actor = {
        firstName: "John"
    }
    const res = await request(app)
                .put(`${URL_BASE}/${actorId}`)
                .send(actor)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("DELETE -> 'URL_BASE', should return statusCode 204", async() => {
    const res = await request(app)
                    .delete(`${URL_BASE}/${actorId}`)
    expect(res.status).toBe(204)
})