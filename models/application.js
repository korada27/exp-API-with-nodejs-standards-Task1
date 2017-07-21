
const Sequelize = require('sequelize'),
  mariaConnection = require('../dbconfig/mariaConnection');


var Application = mariaConnection.define('application', {
	

	AppId:{ type: Sequelize.INTEGER,primaryKey :true},
	ApplicationName :{type:Sequelize.STRING},
	Configuration: {type:Sequelize.BLOB},
	CreatedBy:{type:Sequelize.STRING},
	CreatedOn:{ 
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	ModifiedBy:{type:Sequelize.STRING},
	ModifiedOn:{
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	Start:{type:Sequelize.DATE},
	End:{type:Sequelize.DATE},
	SignOffUser:{type:Sequelize.STRING},
	IsDeleted:{type:Sequelize.INTEGER},
	Group:{type:Sequelize.STRING}
	
  }, {
    timestamps: false,
    tableName: 'application'
  },
  {

    freezeTableName: true  // Model tableName will be the same as the model name
  });

module.exports = Application;

