const express = require("express");

const {getAllChildern,addChild,updateChild,deleteChild,getChildById} 
               = require("../Controller/childController");
const {V_checkID,V_addChild,V_updateChild} = require("../Middlewares/validations/childValidator");

const validator = require("../Middlewares/validations/validator");

const { isAdmin, isTeacher,isAdminOrTeacher } = require("./../Middlewares/Auth/AuthenticationMW");

const router = express.Router();

router.route("/child").all(isAdminOrTeacher)
   .get(getAllChildern)
   .post(V_addChild,validator, addChild)
   .put(V_updateChild, validator, updateChild)
   .patch(V_updateChild, validator, updateChild)


router.route("/child/:id").all(isAdminOrTeacher)
   .get(V_checkID, validator , getChildById)
   .delete(V_checkID, validator, deleteChild)


module.exports = router;