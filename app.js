const express = require('express');
const {getTopics, getArticleById, getUsers, getArticles} = require("./controllers/getControllers")
const{patchById} = require("./controllers/patchControllers")

const app = express();
app.use(express.json());

//app.get apis
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id",  getArticleById);
app.get("/api/users", getUsers)
app.get("/api/articles", getArticles)

//app.patch apis
app.patch("/api/articles/:article_id", patchById)


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

app.use((err, req, res,next)=>{
     console.log(err)
    res.status(500).send({message: 'internal error'})
})

module.exports = app