const express = require("express");

const {deleteTeacher,updateTeacher,addTeacher,getTeacherById,getAllTeachers,getAllSupervisors} 
            = require("../Controller/teacherController");
const {V_checkID,V_addTeacher,V_updateTeacher} = require("../Middlewares/validations/teacherValidator");
const validator = require("../Middlewares/validations/validator");
const { isAdmin, isTeacher } = require("./../Middlewares/Auth/AuthenticationMW");

const router = express.Router();

router.route("/teachers").all(isAdmin)
   .get(getAllTeachers)
   .get(V_checkID, validator , getTeacherById) //client can use "/teachers/?id=1"
   .post(V_addTeacher,  validator, addTeacher)
   .put(V_updateTeacher, validator, updateTeacher)
   .patch(V_updateTeacher, validator, updateTeacher)

//"/teachers/:id"
router.get("/teachers/supervisors",isAdmin,getAllSupervisors);

router.route("/teachers/:id").all(isAdmin)
   .get(V_checkID, validator , getTeacherById) 
   .delete(V_checkID, validator, deleteTeacher)



module.exports = router;