const { body, query, param } = require("express-validator");
const teacherSchema = require("../../Model/teacherSchema");
const childSchema = require("../../Model/childSchema");

exports.V_checkID = [
   param("id").isInt().withMessage("ID should be a valid number")
]

exports.V_addClass = [
   body("_id").isInt().withMessage("ID should be a valid number"),
   body("name").notEmpty().withMessage("Class name cannot be empty"),

   body("supervisor").isMongoId().withMessage("Supervisor ID should be a valid ObjectId")
   .custom(async (value, { req }) => {
      const supervisorExists = await teacherSchema.exists({ _id: value });
      if (!supervisorExists) {throw new Error('Supervisor not found'); }
   }),

   body("children").optional().isArray().withMessage("Children should be an array of IDs")
   .custom(async (value, { req }) => {
      for (let i = 0; i < value.length; i++) {
         const childExists = await childSchema.exists({ _id: value[i] });
         if (!childExists) {throw new Error(`Child not found: ${value[i]}`); }
      }
   }),
   body("children.*").optional().isInt().withMessage("Invalid child ID")
]

exports.V_updateClass = [
   body("_id").isInt().withMessage("ID should be a valid number"),
   body("name").optional().notEmpty().withMessage("Class name cannot be empty"),
   body("supervisor").isMongoId().withMessage("Supervisor ID should be a valid ObjectId")
   .custom(async (value, { req }) => {
      const supervisorExists = await teacherSchema.exists({ _id: value });
      if (!supervisorExists) {throw new Error('Supervisor not found'); }
   }),

   body("children").optional().isArray().withMessage("Children should be an array of IDs")
   .custom(async (value, { req }) => {
      for (let i = 0; i < value.length; i++) {
         const childExists = await childSchema.exists({ _id: value[i] });
         if (!childExists) {throw new Error(`Child not found: ${value[i]}`); }
      }
   }),
   body("children.*").optional().isInt().withMessage("Invalid child ID")
]

