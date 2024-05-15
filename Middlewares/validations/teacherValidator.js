const { body, query, param }=require("express-validator");

exports.V_checkID = [
  param("id").isMongoId().withMessage("ID should be a valid ObjectId"),
  //  query("id").isMongoId().withMessage("ID should be a valid ObjectId"), //client can use "/teachers/?id=1"
  //  body("id").isMongoId().withMessage("ID should be a valid ObjectId")
];

exports.V_addTeacher = [
   //body("_id").isMongoId().withMessage("teacher id should be objectID"), 
   //will be set automatically by mongoDB
   body("fullname").notEmpty().withMessage("teacher fullname is empty"),
   body("password").isLength({ min: 6 }).withMessage("teacher password length minimum 6"),
   body("email").isEmail().withMessage("teacher email should be an valid email"),
   body("image").optional().isString().withMessage("teacher image should be an valid string")
]

exports.V_updateTeacher = [
   body("_id").isMongoId().withMessage("teacher id should be objectID"),
   body("fullname").optional().notEmpty().withMessage("teacher fullname is empty"),
   body("password").optional().isLength({ min: 6 }).withMessage("teacher password length minimum 6"),
   body("email").optional().isEmail().withMessage("teacher email should be an valid email"),
   body("image").optional().isString().withMessage("teacher image should be an valid string")
]





