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
    console.log(id)
    console.log(id)
    fetchArticleById(id).then((article) =>{
        res.status(200).send({article})
    })
}