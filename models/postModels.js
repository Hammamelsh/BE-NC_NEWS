const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");


exports.addComment = (comment, id) =>{
    const {username, body} = comment
     return db.query(`INSERT INTO comments (username, body, article_id) VALUES ($1,$2) RETURNING *`, [username, body, id]).then(({rows})=>{
        console.log(rows)
        return rows[0] 
     })
}