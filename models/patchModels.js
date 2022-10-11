const db = require("../db/connection");

exports.updateVotes = (id, votes) =>{
    
    return db.query(`UPDATE articles SET votes=votes+${votes} WHERE article_id =$1 RETURNING *`, [id]).then(({rows})=>{
        console.log(rows, "<<< models")
        return rows[0];
    })
}
