const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");


exports.addComment = (id,author,body) =>{
    
        console.log(author, body, "<<<model")
        console.log(id)
    
     return db.query(`INSERT INTO comments ( article_id, author,body) VALUES ($1, $2,$3) RETURNING *;`, [id, author, body]).then(({rows})=>{
        console.log(rows)
        return rows[0] 
     })
}