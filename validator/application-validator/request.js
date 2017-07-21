const Joi = require('joi'),


  applicationsqueryValidation = Joi.object({
    applicationids: Joi.string().required(),
    fields: Joi.string().empty(""),
    limit: Joi.number().integer().empty(""),
    offset: Joi.number().integer().empty("")
  }),

  applicationValidation = Joi.object({
    applicationid: Joi.string().required()
  }),
  queryValidation = Joi.object({
    fields: Joi.string().empty("")
  });
  
  

module.exports.applicationsqueryValidation = applicationsqueryValidation;
module.exports.applicationValidation = applicationValidation;
module.exports.queryValidation = queryValidation;
