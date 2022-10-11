const db = require("../db/connection");

exports.updateVotes = (id, votes) =>{
    if(!votes){
        return Promise.reject({
            status:400,
            msg: "no vote update detected",
        })
    }
    else{ 
        return db.query(`UPDATE articles SET votes=votes + $2 WHERE article_id =$1 RETURNING *`, [id, votes]).then(({rows})=>{
        if(rows.length ===0){
            return Promise.reject({
                status:404,
                msg: "This id is not found",
            })
        }
        else{return rows[0];
        }
        
    })}
   
}
