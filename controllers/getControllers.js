const {
    fetchAllTopics, fetchArticleById
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