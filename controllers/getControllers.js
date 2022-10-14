const {
    fetchAllTopics, fetchArticleById, fetchAllUsers, fetchAllArticles, selectCommentsById, fetchAllApis
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
    const {topic, sort_by, order} = req.query

    fetchAllArticles(topic, sort_by, order).then((articles) =>{
        res.status(200).send({articles})
    }).catch((err)=>{
        next(err)
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

exports.getApi = (req,res,next) =>{
    fetchAllApis().then((endpoints)=>{
        res.status(200).send({endpoints})
    })
}