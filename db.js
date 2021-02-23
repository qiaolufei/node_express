let mysql = require('mysql');
const dbConfig = {
    host: '175.24.122.85',
    user: 'root',
    password: 'qlc961009',
    database: 'test'
}


module.exports = {
    query: function (sql, params, callback) {
        let connection = mysql.createConnection(dbConfig);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                let results1 = results === undefined ? results : JSON.parse(JSON.stringify(results))
                let fields1 = fields === undefined ? fields : JSON.parse(JSON.stringify(fields))
                callback && callback(results1, fields1);
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};