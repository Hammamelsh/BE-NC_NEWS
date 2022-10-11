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
    test('status 200: returns article by id', () => {
        const id =1;
    return request(app)
      .get(`/api/articles/${id}`)
      .expect(200)
      .then(({ body : {article} }) => {
        expect(article).toEqual(
            expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author:  expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
                    })
                )
        });

      });
        
    });
    test('status 200: return comment_count', () => {
        const id =1;
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
        comment_count: 11,
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
         
        });
        expect(body.article.comment_count).toBe(11)

      });
        
    });
    test('status: 400, invalid Id not a number', () => {
        const id = "random"
        return request(app)
        .get(`/api/articles/${id}`)
        .expect(400)
        .then(({body}) =>{
            expect(body.msg).toBe("ID/vote is invalid")
        })
        
    });
    test('status:404, correct data type but id does not exist ', () => {
        const id = 287;
        return request(app)
        .get(`/api/articles/${id}`)
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("This id is not found")
        })
    });
});
describe('GET /api/users', () => {
    test('status:200 - returns all users within data', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body : {users}})=>{
            expect(users).toBeInstanceOf(Array)
            expect(users).toHaveLength(4)
            users.forEach(user => {
                expect(user).toEqual(
                expect.objectContaining({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String),
                        })
                    )   
                });
        })

        
    });
 
});
describe('PATCH /api/articles/:article_id', () => {
      test('status 200, updates article by id and accepts a newVote value ', () => {
        const id =1;
        const voteupdate =  { inc_votes: -3 }
        
        return request(app)
        .patch(`/api/articles/${id}`)
        .send(voteupdate)
        .expect(200)
        .then(({body})=>{
            expect(body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 97
            })
            expect(body.article.votes).toBe(97)
        })

      });
      test('status: 400, bad request does not contain valid data type ', () => {
        const id = 1;
        const voteupdate =  {inc_votes: "hello" }
        return request(app)
        .patch(`/api/articles/${id}`)
        .send(voteupdate)
        .expect(400)
        .then(({body}) =>{
            expect(body.msg).toBe("ID/vote is invalid")
        })
        
    })
    test('status: 400, bad request contain empty object with increment ', () => {
        const id = 1;
        const voteupdate =  {}
        return request(app)
        .patch(`/api/articles/${id}`)
        .send(voteupdate)
        .expect(400)
        .then(({body}) =>{
            expect(body.msg).toBe("no vote update detected")
        })
        
    })
    test('status:404, correct data type but id does not exist to update ', () => {
        const id = 287;
        return request(app)
        .patch(`/api/articles/${id}`)
        .send({inc_votes: 2})
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("This id is not found")
        })
    });
    test('status: 400, invalid Id not a number cant patch wrong data type', () => {
        const id = "random"
        return request(app)
        .patch(`/api/articles/${id}`)
        .send({inc_votes: 2})
        .expect(400)
        .then(({body}) =>{
            expect(body.msg).toBe("ID/vote is invalid")
        })
        
    });
   
});

describe('GET api/articles', () => {
    test('status:200, returns all the articles', () => {
        return request(app)
        .get(`/api/articles`)
        .expect(200)
        .then(({body})=>{
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles).toHaveLength(12)
            let articles = body.articles
            articles.forEach((article)=>{
                expect(article).toEqual(expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number),
                }))
            })
        })

    });
});
    
