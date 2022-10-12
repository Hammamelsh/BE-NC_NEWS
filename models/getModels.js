const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");

exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({rows})=>{

        return rows
    })
}
exports.fetchArticleById = (id) =>{

    return db.query(`SELECT articles.*, COUNT(comments.article_id) ::INT as comment_count 
    FROM articles
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`, [id]).then((theResult)=>{
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

exports.fetchAllArticles = (topic) =>{
    return db.query(`SELECT articles.*,
    COUNT(comments.article_id) ::INT as comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
    WHERE articles.topic = 'mitch'
    GROUP BY articles.article_id;;
    `).then(({rows})=>{

        return rows
    })
}

exports. selectCommentsById = (id) =>{
    
    return db.query(`SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC ;
    `, [id]).then(({rows})=>{
        console.log(rows, "<<<model")
    
            return rows
            

            
       

    
})
}

    
    