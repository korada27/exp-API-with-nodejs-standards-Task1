
const express = require('express'),
  router = express.Router(),
  Joi = require('joi'),
  reqJoi = require('../../validator/application-validator/request'),
  
  getApplications = require('../../services/applications/applications-service');
  validator = require('express-joi-validation')({
    passError: true // NOTE: this tells the module to pass the error along for you
  })

router.get('/applications/all',validator.query(reqJoi.applicationsqueryValidation), function (req, res, next) {

  	
	var jsonObject = {
    "applicationIds": req.query.applicationids,
    "limit": req.query.limit,
    "offset": req.query.offset,
    "fields": req.query.fields
  };
 
 
    var expireTime = 120;
	getApplications.getManyApplicationsId(jsonObject, next, function (data) {
    res.json(data);
  });

});

module.exports = router;
