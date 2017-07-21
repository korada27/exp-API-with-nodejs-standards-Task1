
var removeSpecialCharacters = function (data,callback) {

  callback((data).replace(/[^a-z A-Z\.,]/g, ""));


};
module.exports.removeSpecialCharacters=removeSpecialCharacters;
