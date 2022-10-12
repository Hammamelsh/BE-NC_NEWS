const {
    fetchAllTopics, fetchArticleById, fetchAllUsers, fetchAllArticles, selectCommentsById,
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
    console.log(topic)
    fetchAllArticles(topic).then((articles) =>{
        res.status(200).send({articles})
    })
}

exports.getCommentsById = (req, res, next) =>{
    const id = req.params.article_id
    fetchArticleById(id)
    .then(()=>{
    selectCommentsById(id).then((comments)=>{
        res.status(200).send({comments})
    }) 
    })
    .catch((err)=>{
        next(err)
    })
    
}