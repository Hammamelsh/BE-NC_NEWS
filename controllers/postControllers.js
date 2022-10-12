const{addComment}= require('../models/postModels')
const{fetchArticleById} = require('../models/getModels')


exports.postComments = (req,res,next) =>{
    const {body, author} = req.body
    const id = req.params.article_id
    console.log(req.body)

    fetchArticleById(id)
    .then(()=>{
    addComment(id,author,body).
    then((comments)=>{
        console.log(comments)
        res.status(201).send({comments})
    }) 
    })
.catch((err)=>{
    next(err)
})
}