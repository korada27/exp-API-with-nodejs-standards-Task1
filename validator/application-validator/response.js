
const Joi = require('joi'),


 schema = Joi.object().keys({/* 
  AppId: Joi.number().integer().required(), */
  ApplicationName: Joi.string()/* ,
  Configuration: Joi.blob(),
  CreatedBy: Joi.string(),
  CreatedOn: Joi.date(),
  ModifiedBy: Joi.string(),
  ModifiedOn: Joi.date(),
  Start: Joi.date(),
  End: Joi.date(),
  SignOffUser: Joi.string(),
  IsDeleted: Joi.integer(),
  Group: Joi.string() */
  
}),
 metadata=Joi.object({
	 
  'count': Joi.number().integer(),
  'limit': Joi.number().integer(),
  'offset': Joi.number().integer()

}),

 applicationJoi = Joi.array().items(schema).min(1).unique()
  .required(),
 Schema=Joi.object({

  'application':applicationJoi,
  'metadata':metadata
});
module.exports=Schema;
