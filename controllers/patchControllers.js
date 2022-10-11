const{updateVotes} = require('../models/patchModels')

exports.patchById = (req,res,next) =>{
    const id = req.params.article_id
    const {inc_votes} = req.body
    updateVotes(id, inc_votes).then((article) =>{
        res.status(200).send({article})
    })
    .catch((err)=>{
        next(err)
    })
}
