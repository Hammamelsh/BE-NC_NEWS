const db = require("../db/connection");

exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({rows})=>{
        
        return rows
    })
}
exports.fetchArticleById = (id) =>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [id]).then((theResult)=> theResult.rows[0])
}