const express = require('express'),
  bodyParser = require('body-parser'),
  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/data', require('./routes/applications/applications'));


// error handler
app.use(function (err, req, res, next) {
  console.log(next);
  console.log("In first Function");
  if (err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
	  res.status(400).json({
      status:400,
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } 
  else {
    res.locals.message = 'Not Found/Invalid Data Input';
    var err = new Error('Not Found/Invalid Data Input');
    err.message = 'Not Found/Invalid Data Input';
    err.status = 404;
    var e = err.status || 404;
    var error = {"user error": err, "status": e};
    res.send(err);
  }
});



app.use(function (err, req, res, next) {
  //TODO requester name (log requester info)
  //register
  console.log("DB Exception " + JSON.stringify(err));

  //console.log("error Name " + err);
  if (err.name === "SequelizeAccessDeniedError" || err.name === "SequelizeDatabaseError" || err.name === "SequelizeConnectionError") {
    console.log("sequliser base error");
    //TODO update error messages
    var err = {
      "developerMessage": "invalid db credentials or db name or table name",
      "userMessage": "invalid database details",
      "status": 500,
      "errorCode": "500",
      "moreInfo": "invalid db credentials"
    };
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.send(err)
  }

});



module.exports = app;
