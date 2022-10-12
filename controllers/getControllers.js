const {
    fetchAllTopics, fetchArticleById, fetchAllUsers, fetchAllArticles,
} = require('../models/getModels')

exports.getTopics = (req,res,next) =>{
    fetchAllTopics().then((topics) =>{
        res.status(200).send({topics})
    })
}
exports.getArticleById = (req,res,next) =>{
    const id = req.params.article_id
    fetchArticleById(id).then((article) =>{
        res.status(200).send({article})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getUsers = (req, res, next) =>{
    fetchAllUsers().then((users) =>{
        res.status(200).send({users})
    })
}

exports.getArticles = (req,res,next) =>{
    const {topic} = req.query
    fetchAllArticles(topic).then((articles) =>{
        res.status(200).send({articles})
    }).catch((err)=>{
        next(err)
    })
   
}