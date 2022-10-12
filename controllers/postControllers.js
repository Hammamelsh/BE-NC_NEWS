const{addComment}= require('../models/postModels')


exports.postComments = (req,res,next) =>{
    const {body, username} = req.body
    const id = req.params.article_id
    fetchArticleById(id)
    .then(()=>{addComment(req.body, id).then((comment) =>{
    res.status(201).send({comment})
})
})
.catch((err)=>{
    next(err)
})
}