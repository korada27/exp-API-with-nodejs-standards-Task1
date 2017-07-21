const winston = require('winston');
winston.emitErrs = true;


var logger = new( winston.Logger )( {
  transports: [
    new winston.transports.Console( {
      level: 'debug',
      colorize: true,
      json:false
    } )
  ],
  exceptionHandlers: [
    new winston.transports.Console( {
      level: 'error',
      colorize: true,
      json:false
    } )]
} );

module.exports=logger;
