const {
    fetchAllTopics,
} = require('../models/getModels')

exports.getTopics = (req,res,next) =>{
    fetchAllTopics().then((topics) =>{
        res.status(200).send({topics})
    })
}
exports.getArticleById = (req,res,next) =>{
    fetchArticleById().then((article) =>{
        res.status(200).send({article})
    })
}