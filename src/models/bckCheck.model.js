const mysqlConnection = require("../../connection");


const getBckInfoByUserID = function(userID,callback){
    mysqlConnection.query("select * from bck_check_info where user_id_fk = "+userID+";",(err, rows, fields)=>{
        if(!err){
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const deleteBckInfoByUserID = function(userID,callback){
    const sqlQuery = "delete from bck_check_info where user_id_fk = "+userID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Deleted ${rows.affectedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const createBckInfo = function(payLoad,callback){
    const userIDFK = payLoad['user_id_fk'];
    const ssn = payLoad['ssn'];
    const bck_id_type_id_fk = payLoad['bck_id_type_id_fk'];
    const bck_id_number = payLoad['bck_id_number'];
        const sqlQuery = "insert into bck_check_info (ssn, bck_id_type_id_fk, bck_id_number, user_id_fk) values ('"+ssn+"', "+bck_id_type_id_fk+", '"+bck_id_number+"', "+userIDFK+");";
        mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
            if(!err){
                var insertId = rows.insertId+'';
                console.log('Last insert ID:', insertId);
                return callback(null,insertId);
            }else{
                err['displayMessage'] = 'Error creating background check information!';
                return callback(err);
            }
        })
};

const getBckTypeFK = function(type,callback){
    const sqlQuery = "SELECT id FROM bck_id_type where type='"+type+"';"
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

module.exports = {
    getBckInfoByUserID: getBckInfoByUserID,
    deleteBckInfoByUserID: deleteBckInfoByUserID,
    createBckInfo: createBckInfo
};