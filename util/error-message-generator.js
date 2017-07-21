var invalidUserId = function () {
  return {
    "developerMessage": "The user doesn't exists or invalid.",
    "userMessage": "No results found!",
    "status": 404,
    "errorCode": "TBD",//TODO define standard error codes
    "moreInfo": "The user doesn't exists or invalid."
  }
};


module.exports.invalidUserId = invalidUserId;
