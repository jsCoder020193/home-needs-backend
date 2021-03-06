const mysqlConnection = require("../../connection");

const authenticateUser = function(payLoad, callback){
    const email = payLoad['email'];

    const query = "select * from login where email = '"+email+"';";
    mysqlConnection.query(query,(err, rows, fields)=>{
        if(!err){
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
}

const getLoginByUserID = function(userID,callback){
    mysqlConnection.query("select id,email from login where id = "+userID+";",(err, rows, fields)=>{
        if(!err){
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};


const updatePassword = function(loginID,payLoad,callback){
    const newPassword = payLoad['password'];
    const sqlQuery = "update login set password = '"+newPassword+"' where id = "+loginID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const canCreateLogin = function(email,callback){
    return new Promise(function(resolve, reject) {
        mysqlConnection.query("select * from login where email = '"+email+"';",(err, rows, fields)=>{
            if(!err){
                if(rows.length>0)
                    resolve(false);
                else
                    resolve(true);
            }else{
                reject(err);
            }
        })
      });
};

const createLogin = function(payLoad,callback){
    var keys = Object.keys(payLoad);
    var colums = "", values ="";
    keys.forEach(key => {
        colums+=key+",";
        values+="'"+payLoad[key]+"',";
    });
    colums = colums.substring(0, colums.length - 1);
    values = values.substring(0, values.length - 1);

    const sqlQuery = "insert into login ("+colums+") values ("+values+");";

    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            var insertId = rows.insertId+'';
            console.log('Last insert ID:', insertId);
            return callback(null,insertId);
        }else{
            return callback(err);
        }
    })
};


module.exports = {
    canCreateLogin: canCreateLogin,
    authenticateUser: authenticateUser,
    getLoginByUserID: getLoginByUserID,
    updatePassword: updatePassword,
    createLogin: createLogin
};