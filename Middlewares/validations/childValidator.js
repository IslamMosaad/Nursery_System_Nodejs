const { body, query, param }=require("express-validator");

exports.V_checkID = [
    param("id").isInt().withMessage("ID should be a valid number")
]

exports.V_addChild = [
   // body("_id").isInt().withMessage("ID should be a valid number"),
    body("fullName").notEmpty().withMessage("Child's full name cannot be empty"),
    body("age").isInt({ min: 0 }).withMessage("Age should be a positive integer"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Invalid level"),
    body("address.city").notEmpty().withMessage("City cannot be empty"),
    body("address.street").notEmpty().withMessage("Street cannot be empty"),
    body("address.building").notEmpty().withMessage("Building cannot be empty")
]

exports.V_updateChild = [
    body("_id").isInt().withMessage("ID should be a valid number"),
    body("fullName").optional().notEmpty().withMessage("Child's full name cannot be empty"),
    body("age").optional().isInt({ min: 0 }).withMessage("Age should be a positive integer"),
    body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("Invalid level"),
    body("address.city").optional().notEmpty().withMessage("City cannot be empty"),
    body("address.street").optional().notEmpty().withMessage("Street cannot be empty"),
    body("address.building").optional().notEmpty().withMessage("Building cannot be empty")
]

