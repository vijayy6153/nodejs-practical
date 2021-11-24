'use strict';
// Import required user defined libraries
var helper = require('../Helper/helper');
var helpers = new helper();
var md5 = require('md5');

module.exports.user_owned_vechicles  = async function user_owned_vechicles(req, res, next) {
  var sqlParam = [
      req.swagger.params.UserId.value
    ];
    let results = await helpers.dbFetchInsertRecords("CALL uspUserOwnedVechiclesGet(?)", sqlParam, null, res);
    let data = {
      UserData: results[0]
    }
    return res.send({status: 200, message: 'Success', data: data});
}

module.exports.vehicles = async function vehicles(req, res, next) {
  var reqData = req.query;
  var sqlParam = [
      reqData.page,
      reqData.offset
    ];
    let results = await helpers.dbFetchInsertRecords("CALL uspVehiclesList(?,?)", sqlParam, null, res);
    return res.send({status: 200, message: 'Success', data: results[1], totalRecord: results[0][0].TotalRecord});
}