const express = require('express'),
  router = express.Router(),
  Sequelize = require('sequelize'),
  cacher = require('sequelize-redis-cache'),
  mariaConnection = require('../../dbconfig/mariaConnection'),
  redisConnection = require('../../dbconfig/redisConnection'),
  Joi = require('joi'),
  applicationJoi = require('../../validator/application-validator/response'),
  errorMessage = require('../../util/error-message-generator'),
  applicationProcessing = require('../../experience/applicationProcessing'),
  logger = require('../../util/logger'),
  applicationSchema = require('../../models/application'),
  config = require('config.json')('./config/dbconfig.json');
  
console.log("expireTime from JSON file is : " + config.expireTime + " seconds");

var cacheObj = cacher(mariaConnection, redisConnection).model('application');

var getManyApplicationsId = function (jsonObject, next, callback) {
	
	
  var applicationIds = jsonObject.applicationIds.split(",");
  var offset = jsonObject.offset;
  var limit = jsonObject.limit;
  
  
   var json =
    {
      "applicationIds": applicationIds.sort(),
      "fields": jsonObject.fields,
      "off": offset,
      "lim": limit
    };
	
  var count = 0;
  
  if (limit === undefined && offset === undefined) {
    console.log("No limit and no offset")
    json.off = 0;
    cacheObj.ttl(1);
    //cacheObj.caching(flase);
    cacheObj.findAll(
      {
        where: {"Group": applicationIds}
      }).then(function (row) {
        console.log("count" + row.length);
      json.lim = parseInt(row.length);
      console.log("Count" + json.lim);
      getManyApplicationDBOperation(json, next, function (data) {
        applicationProcessing._getManyApplications(jsonObject, data, next, function (result) {

          callback(result);
        })
      })

    })
  }
   else {

    json.lim = 0;
    cacheObj.ttl(1);
    //cacheObj.caching(false);
    cacheObj.findAll(
      {
        where: {Group: applicationIds}
      }).then(function (row) {
      json.lim = parseInt(row.length)
      count = parseInt(row.length)
      console.log("count in else" + json.lim)
      console.log("Count" + row.length);
      if (limit === undefined) {
        if (offset === undefined) {
          json.off = 0;
          console.log("limit offset undefined");
          getManyApplicationDBOperation(json, next, function (data) {
            applicationProcessing._getManyApplications(jsonObject, data, next, function (result) {
              console.log(result);
              callback(result);
            })
          });

        }
        else {
          json.off = parseInt(offset);
          console.log("in else" + "limit" + json.lim + "   " + "offset" + json.off);
          if (json.lim > json.off) {

            getManyApplicationDBOperation(json, next, function (data) {
              applicationProcessing._getManyApplications(jsonObject, data, next, function (result) {
                console.log(result);
                callback(result);
              })
            })
          }
          else {
            var data = {
              "developerMessage": "Please set exact range to offset",
              "status": "400",
              "errorCode": "offset error",
              "moreInfo": "provide offset range by comparing count"
            };
            callback(data);
          }
        }
      }
      else {
        if (offset === undefined) {
          json.lim = parseInt(limit);

          getManyApplicationDBOperation(json, next, function (data) {
            applicationProcessing._getManyApplications(jsonObject, data, next, function (result) {
              console.log(result);
              callback(result);
            })
          })
        }
        else {
          json.lim = parseInt(limit)
          json.off = parseInt(offset)
          if (count > json.off) {

            getManyApplicationDBOperation(json, next, function (data) {
              applicationProcessing._getManyApplications(jsonObject, data, next, function (result) {
                console.log(result);
                callback(result);
              })
            })
          }
          else {
            var data = {
              "developerMessage": "Please set exact range to offset",
              "status": "400",
              "errorCode": "offset error",
              "moreInfo": "provide offset range by comparing count"
            };

            callback(data);

          }
        }
      }
    })
  }  
};



var getManyApplicationDBOperation = function (jsonObject, next, callback) {

  var applicationIds = jsonObject.applicationIds;
  console.log(applicationIds);
  cacheObj.ttl(config.expireTime);

  cacheObj.findAll({
    where: {"Group": applicationIds.sort()},
    limit: jsonObject.lim,
    offset: jsonObject.off
  }).then(function (response) {
    console.log(response.length + JSON.stringify(response));
    if (response.length > 0) {

      var applications = [];
      for (var data in response) {
        if (response.hasOwnProperty(data)) {
			
          applications.push({
			  
            "ApplicationName": response[data].ApplicationName
          });
        }
      }
      var resultSet = {
        "metadata": {"count": applications.length, "limit": jsonObject.lim, "offset": jsonObject.off},
        "application": applications
      };
      Joi.validate(JSON.stringify(resultSet), applicationJoi, function (err, value) {
        if (err) {
          callback(err);
        }
        else {


          callback(value);
        }
      });


    } else {
      callback(errorMessage.invalidDeviceId());
    }

  }).catch(next);
};


exports.getManyApplicationsId = getManyApplicationsId;
