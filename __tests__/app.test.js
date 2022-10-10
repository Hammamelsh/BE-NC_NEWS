const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index");

beforeEach(() => {
    return seed({articleData,
        commentData,
        topicData,
        userData,})
})

afterAll(() => {
    if(db.end) db.end();
})

describe('Backend testing', () => {
    describe('GET /api/topics', () => {
        test('status:200 - returns all topics within data', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body : {topics}})=>{
                expect(topics).toBeInstanceOf(Array)
                topics.forEach(topic => {
                    expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String),
                            })
                        )   
                    });
            })

            
        });
        test('status :400 , get api/topixxx, bad request  ', () => {
            return request(app)
            .get("/api/topixxx")
            .expect(400)
            .then(({body})=> {
                console.log(body)
                expect(body.msg).toBe("bad request")
            })
        });
    });
});