const {removeComment} = require('../models/deleteModels')

exports.deleteComment = (req, res, next)=>{
const id = req.params.comment_id
console.log(id)
removeComment(id).then(()=>{
    res.status(204).send();
})
.catch((err)=>{
    next(err)
})
 
}