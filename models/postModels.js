const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");


exports.addComment = (id,author,body) =>{
    
   if (!author || !body) {
      return Promise.reject({
        status: 400,
        message: "bad request not correct format",
      });
    }

    
     return db.query(`INSERT INTO comments (article_id, author,body) VALUES ($1, $2, $3) RETURNING *;`, [id, author, body]).then(({rows})=>{
        if(rows.length === 0)
        return rows[0] 
     })
}