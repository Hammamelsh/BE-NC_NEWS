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
        test('status :404 , get api/topixxx, not found ', () => {
            return request(app)
            .get("/api/topixxx")
            .expect(404)
            .then(({body})=> {
                
                expect(body.msg).toBe("not found")
            })
        });
    });
    
    describe('GET api/articles/:article_id', () => {
    test.only('status 200: returns article by id', () => {
        const id = 1;
    return request(app)
      .get(`/api/articles/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({ 
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
         
        });

      });
        
    });
    test.only('status: 400, invalid Id not a number', () => {
        const id = "random"
        return request(app)
        .get(`/api/articles/${id}`)
        .expect(400)
        .then(({body}) =>{
            expect(body.msg).toBe("ID is invalid")
        })
        
    });
    test.only('status:404, correct data type but id does not exist ', () => {
        const id = 287;
        return request(app)
        .get(`/api/articles/${id}`)
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("This id is not found")
        })
    });
});


    
});