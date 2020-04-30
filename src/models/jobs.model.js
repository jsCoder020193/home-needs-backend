const mysqlConnection = require("../../connection");

const getJobs = function(callback){
    mysqlConnection.query("select * from job;",(err, rows, fields)=>{
        if(err) return callback(err);
        return callback(null,rows);
    });
};
//update use fks
const getJobsByID = function(jobID,callback){
    const query = `select * from job where id = '`+jobID+`';`;

    mysqlConnection.query(query,(err, rows, fields)=>{
        if(!err){
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

//update use fks
const getJobsByCustomerID = function(custID,callback){
    mysqlConnection.query(`select * from job where customer_id_fk = '`+custID+`';`,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};
//update use fks

const getJobsBySPID = function(SPID,callback){
    mysqlConnection.query(`select * from job where service_provider_id_fk = '`+SPID+`';`,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const updateJob = function(jobID,payLoad,callback){
    const columnName = payLoad['columnName'];
    const updateValue = payLoad['updateValue'];
    const sqlQuery = "update job set "+columnName+" = '"+updateValue+"' where id = "+jobID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const updateJobStatus = function(jobID,status,callback){

    const sqlQuery = "update job set job_status = '"+status+"' where id = "+jobID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Changed ${rows.changedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const deleteJobs = function(jobID,callback){

    const sqlQuery = "delete job where id = "+jobID+";";
    mysqlConnection.query(sqlQuery,(err, rows, fields)=>{
        if(!err){
            console.log(`Deleted ${rows.affectedRows} row(s)`);
            return callback(null,rows);
        }else{
            return callback(err);
        }
    })
};

const createJob = function(payLoad,callback){
    payLoad['job_status'] = 'job_created';
    payLoad['payment_id_fk'] = null;
    //update payment id later
    const sqlQuery = "insert into job (quote_id_fk, customer_id_fk, service_provider_id_fk, job_status, services_id_fk, address_id_fk, payment_id_fk) VALUES ? ;";
    mysqlConnection.query(sqlQuery,payLoad,(err, rows, fields)=>{
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
    getJobs: getJobs,
    getJobsByID: getJobsByID,
    getJobsByCustomerID: getJobsByCustomerID,
    getJobsBySPID: getJobsBySPID,
    updateJob: updateJob,
    updateJobStatus: updateJobStatus,
    deleteJobs: deleteJobs,
    createJob: createJob
};