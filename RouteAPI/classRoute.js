const express = require("express");

const {getClassSupervisor,getClassChildren,deleteClass,getClassById,updateClass,addClass,getAllClasses} 
            = require("../Controller/classController");
const {V_checkID,V_addClass,V_updateClass} = require("../Middlewares/validations/classValidator");
const validator = require("../Middlewares/validations/validator");
const { isAdmin, isTeacher,isAdminOrTeacher } = require("./../Middlewares/Auth/AuthenticationMW");

const router = express.Router();

router.route("/class")
   .get(isAdminOrTeacher,getAllClasses)
   .post(isAdmin,V_addClass, validator,addClass)
   .put(isAdmin,V_updateClass, validator, updateClass)
   .patch(isAdmin,V_updateClass, validator, updateClass)


router.route("/class/:id")
   .get(isAdminOrTeacher,V_checkID, validator , getClassById)
   .delete(isAdmin,V_checkID,validator, deleteClass)

router.get("/class/child/:id",isAdminOrTeacher,V_checkID,validator ,getClassChildren);
router.get("/class/teacher/:id",isAdmin,V_checkID,validator ,getClassSupervisor);
module.exports = router;