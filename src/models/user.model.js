const mysqlConnection = require("../../connection");

//create joins with fks
const getUsers = function(callback){
    mysqlConnection.query("select * from user;",(err, rows, fields)=>{
        if(err) return callback(err);
        return callback(null,rows);
    });
};

//create joins with fks
const getUserByID = function(userID,callback){
    const query = `select * from login,user,address,phone_number where login.user_id_fk='`+userID+`' and user.id = '`+userID+`' 
    and user.address_id_fk = address.id and phone_number.user_id_fk = '`+userID+`';`;

    mysqlConnection.query(query,(err, rows, fields)=>{
        if(!err){
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const deleteUser = function(userID,callback){
    mysqlConnection.query("update user set status = 'deleted' where id = "+userID+";",(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            // console.log(`Deleted ${result.affectedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const updateUser = function(userID,payLoad,callback){
    const columnName = payLoad['columnName'];
    const updateValue = payLoad['updateValue'];
    const sqlQuery = "update user set "+columnName+" = '"+updateValue+"' where id = "+userID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const updateUserAddress = function(userID,addressID,callback){

    const sqlQuery = "update user set address_id_fk = '"+addressID+"' where id = "+userID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};


// const createUser = function(payLoad){
//     return new Promise(function(resolve, reject) {
//     // do a thing, possibly async, then…
//     const sqlQuery = "insert into user (first_name, middle_name, last_name, user_type, status, user_since) values ('"+payLoad['first_name']+"','"+payLoad['middle_name']+"','"+payLoad['last_name']+"','"+payLoad['user_type']+"','"+payLoad['status']+"','"+payLoad['user_since']+"');";
//     mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
//         if(!err){
//             var insertId = { insertId: rows.insertId};
//             console.log('Last insert ID:', rows.insertId);
//             resolve(rows.insertId);
//         }else{
//             reject(Error(err));
//         }
//     })
//   });
// };

const createUser = function(payLoad,callback){
    const sqlQuery = "insert into user (first_name, middle_name, last_name, user_type, status, user_since) values ('"+payLoad['first_name']+"','"+payLoad['middle_name']+"','"+payLoad['last_name']+"','"+payLoad['user_type']+"','"+payLoad['status']+"','"+payLoad['user_since']+"');";
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
    getUsers: getUsers,
    getUserByID: getUserByID,
    deleteUser: deleteUser,
    updateUser: updateUser,
    updateUserAddress: updateUserAddress,
    createUser: createUser
};