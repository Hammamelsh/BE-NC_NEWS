const db = require("../db/connection");

exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({rows})=>{
        
        return rows
    })
}
exports.fetchArticleById = (id) =>{

    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [id]).then((theResult)=>{
    if(theResult.rows.length !== 0){
    return theResult.rows[0]}
    else{
        return Promise.reject({
            status:404,
            msg: "This id is not found",
        })
    }
    
})
}

exports.fetchAllUsers = () =>{
    return db.query(`SELECT * FROM users`).then(({rows})=>{

        return rows
    })
}

