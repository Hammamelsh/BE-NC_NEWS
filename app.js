const express = require('express');
const {getTopics, getArticleById, getUsers, getArticles, getCommentsById, getApi} = require("./controllers/getControllers")
const{patchById} = require("./controllers/patchControllers")
const{postComments} = require("./controllers/postControllers")
const{deleteComment} = require("./controllers/deleteControllers")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
//app.get apis
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id",  getArticleById);
app.get("/api/users", getUsers)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsById)
app.get("/api", getApi)
//app.patch apis
app.patch("/api/articles/:article_id", patchById)

//app.post apis
app.post("/api/articles/:article_id/comments", postComments)

//app.delete apis
app.delete("/api/comments/:comment_id", deleteComment)



//error Handling
app.use("*", (req,res)=>{
    res.status(404).send({msg : "not found"})
})

app.use((err, req, res, next)=>{
    if(err.status === 404 && err.msg){
        res.status(404).send(err)
    }
    next(err)
    })

app.use((err, req, res, next)=>{
    if(err.status === 400 && err.msg){
        res.status(400).send(err)
    }
    next(err)
    })

app.use((err, req, res, next)=>{
    if(err.code === "22P02"){
    res.status(400).send({msg: "ID/vote is invalid"})
            }
    next(err)
            })
app.use((err, req, res, next)=>{
    if(err.code === '23503'){
    res.status(404).send({msg: "Id/foreign key not found"})
            }
    next(err)
            })

app.use((err, req, res,next)=>{
    res.status(500).send({message: 'internal error'})
})

module.exports = app