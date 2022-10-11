const{updateVotes} = require('../models/patchModels')

exports.patchById = (req,res,next) =>{
    const id = req.params.article_id
    const votes = req.body.inc_votes
    updateVotes(id, votes).then((votes) =>{
        res.status(200).send({votes})
    })
    .catch((err)=>{
        next(err)
    })
}