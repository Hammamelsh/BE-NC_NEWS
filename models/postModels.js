const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");


exports.addComment = (id,author,body) =>{
    
     return db.query(`INSERT INTO comments (article_id, author,body) VALUES ($1, $2, $3) RETURNING *;`, [id, author, body]).then(({rows})=>{
        if(rows.length === 0){
         return Promise.reject({
            status:404,
            msg: "This id is not found",
        })
        }else{ 
         return rows[0] 
      }
       
     })
}