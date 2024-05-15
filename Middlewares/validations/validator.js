const {validationResult} = require("express-validator");

//default exports for the validator
module.exports = (req,res,next) =>
{
   let result = validationResult(req);

   if(result.errors.length > 0)
   {
      let msg=result.errors .reduce((current,obj)=>current + obj.msg +" , ","");
                 //to get all errors in one string msg
      let error = new Error(msg);
      error.status = 422;
      next(error);
   }
   else
   {
      next();
   }
}