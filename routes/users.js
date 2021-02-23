let express = require('express');
let router = express.Router();
let db = require("../db"); //引入数据库封装模块

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

router.get('/getUsers', function (req, res, next) { // 获取全部user信息
  const sql = "SELECT * FROM users"
  db.query(sql, [], function (result, fields) {
    res.send(resObj(200,result, 'success'));
  })
});

router.get('/getUserById', function (req, res, next) { // 根据id查找user
  let id = req.query.id
  const sql = `SELECT * FROM users where id = ${id}`
  db.query(sql, [], function (result, fields) {
    res.send(resObj(200,result, 'success'));
  })
})

router.post('/updateUserById',function(req,res,next){ // 根据id修改user
  let {id,name,age} = req.body
  const sql1 = `SELECT * FROM users where id = ${id}`
  db.query(sql1, [], function (result, fields) {
    if (result !== []) {
      const sql2 = `update users set name = '${name}', age = ${age} where id = ${id}`
      db.query(sql2, [], function(result2, fields2){
        if (result2 !== null) {
          res.send(resObj(200, [], 'success'));
        } else {
          res.send(resObj(201, [], 'fail'));
        }
      })
    } else {
      res.send(resObj(202, [], '无此id!'));
    }
  })
})

router.post('/addUser', function(req,res,next){ // 添加user
  let {name,age} = req.body
  const sql = `insert into users(name,age)values( '${name}','${age}')`
  db.query(sql, function (result, fields) {
    if (fields !== undefined && result === null) {
      res.send(resObj(200,[], 'success'));
    } else {
      res.send(resObj(201,[], 'fail'));
    }
  })
})

router.post('/deleteUserById', function (req,res,next) {
  let id = req.body.id
  const sql1 = `SELECT * FROM users where id = ${id}`
  db.query(sql1, [], function (result, fields) {
    if (result !== []) {
      const sql2 = `delete from users where id = ${id}`
      db.query(sql2, [], function (result2, fields2) {
        if (result2 !== null) {
          res.send(resObj(200, [], 'success'));
        } else {
          res.send(resObj(201, [], 'fail'));
        }
      })
    } else {
      res.send(resObj(202, [], '无此id!'));
    }
  })
})

module.exports = router;
