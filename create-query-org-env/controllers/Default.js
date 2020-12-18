'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');
const {getEnv,postEnv,postOrg,getOrg} = require('./implementation');


module.exports.anypointEnvGET = function anypointEnvGET (req, res, next) {
  Default.anypointEnvGET()
    .then(function (response) {
      getEnv()
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointEnvPOST = function anypointEnvPOST (req, res, next) {
  var generated = req.swagger.params['generated'].value;
  Default.anypointEnvPOST(generated)
    .then(function (response) {
      postEnv(generated)

      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointOrgGET = function anypointOrgGET (req, res, next) {
  Default.anypointOrgGET()
    .then(function (response) {
      getOrg()

      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointOrgPOST = function anypointOrgPOST (req, res, next) {
  var generated = req.swagger.params['generated'].value;
  Default.anypointOrgPOST(generated)
    .then(function (response) {
      // var name = generated
      // name = JSON.parse(name)
      // console.log(name)
      // console.log(typeof name)
      //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
      postOrg(generated)
      

      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
