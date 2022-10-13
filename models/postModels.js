const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");


exports.addComment = (id,author,body) =>{
const theAuthor = ["butter_bridge"]


   if(!author || !body){
      return Promise.reject({
         status:400,
         msg: "bad request not correct format",
     })}
   
   // // } else if(){

   // }
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