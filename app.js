const express = require('express');
const {getTopics} = require("./controllers/getControllers")

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.use("*", (req,res)=>{
    res.status(400).send({msg : "bad request"})
})

app.use((err, req, res,next)=>{
    console.log(err)
    res.status(500).send({message: 'internal error'})
})

module.exports = app