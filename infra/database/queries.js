const connection = require('./connection.js');

const execQuery = (query, params = '') => {
    return new Promise((resolve,  reject) => {
        connection.query(query, params, (err, results, fields) => {
            if(err) {
                reject(err)
            } else {
                reject(results)
            }
        })
    })
    
}

module.exports = execQuery;