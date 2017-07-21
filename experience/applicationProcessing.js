const regExpression=require('../util/regular-expression');

var _getManyApplications = function(jsonObject,data,next,callback){
  console.log("dfd"+jsonObject.fields);

  if(jsonObject.fields===undefined || !(jsonObject.fields)||(!jsonObject.fields.length)){

    callback(data);

  }else{
    var regExpData;
    console.log("else"+jsonObject.fields);
    regExpression.removeSpecialCharacters(jsonObject.fields,function (data) {
      regExpData=data;
    });
   // var regExpData = (jsonObject.fields).replace(/[^a-z A-Z\.,]/g, "");
    console.log(regExpData);

    var fieldsData=regExpData.split(',');
    console.log(fieldsData);
    var result=data.application;
    var finalResult=[];
    for(var i=0;i<result.length;i++){
      var arr3={};
      for(var j=0;j<fieldsData.length;j++){
        if(result[i][fieldsData[j]]){
          arr3[fieldsData[j]]=result[i][fieldsData[j]];
        }

      }
      if((Object.keys(arr3).length) === 0){

      }else{
        finalResult.push(arr3);
      }

    }

    if(finalResult.length===0){
      callback({
        "developerMessage": "plese check the fields.",
        "userMessage": "No results found!",
        "status": 404,
        "errorCode": "TBD"//TODO define standard error codes

      })
    }else{
      callback({"metadata":data.metadata,
        "application":finalResult
      });
    }
  }


};
exports._getManyApplications=_getManyApplications;
