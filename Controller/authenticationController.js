const jwt = require("jsonwebtoken");
const teacherSchema = require("./../Model/teacherSchema");
const bcrypt = require("bcrypt");

exports.login = (req, res, next) => {
    teacherSchema.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((object) => {
      if (!object) {
        let error = new Error("not Authenicated");
        error.status = 401;
        throw error;
      }
      let token = jwt.sign(
        {
          id: object._id,
          name: object.name,
          role: "teacher",
        },
        "Islam Mosad", 
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ data: "Authenticated", token });
    })
    .catch((error) => next(error));
};
