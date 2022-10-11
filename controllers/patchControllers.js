const{updateVotes} = require('../models/patchModels')

exports.patchById = (req,res,next) =>{
    const id = req.params.article_id
    console.log(id)
    const {inc_votes} = req.body
    console.log(inc_votes)
    updateVotes(id, inc_votes).then((article) =>{
        console.log({article}, "<<< in controller")
        res.status(200).send({article})
    })
    .catch((err)=>{
        next(err)
    })
}
