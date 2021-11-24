'use strict';
// Import required node libraries
var connection = require('../db_connector.js');


class helper {

    //  Database fetch insert records
    async dbFetchInsertRecords(sQuery, values, callback, res = null) {
        
        // console.log(results);
        return new Promise((resolve, reject)=>{
        connection.query(sQuery, values, async (error, results, fields) => {
            // RETURN ERROR 
            if (error) {
                var errDetail = {
                     'Query':  sQuery,
                     'Values': values,
                     'Error': error.sqlMessage,
                     'ErrorSQL': error.sql,
                };
                if(res){
                    return res.send({status: 400, message: 'Something went wrong, please try again later!', data: errDetail});
                }
                console.log('SQL ERROR: ', errDetail);
                //return res.send({status: 400, message: 'Something went wrong, please try again later!', data: error});
            }
            else{
                // call back result
                //console.log(results);
                return resolve(results);
            };
        })
            
        });
    };
}

module.exports = helper;
