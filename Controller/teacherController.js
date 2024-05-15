const teacherSchema=require("../Model/teacherSchema");
const classSchema=require("../Model/classSchema");
const bcrypt = require("bcrypt");

exports.getAllTeachers = (req, res, next) => 
{ 
   // let ex ={ _id:"562b2649b2e70464f113c04d",fullname:"Islam Mosad",password:"12345", email:"islam@yahoo.com" , image:"male" };
   // res.status(200).json({getAllTeachers:[ex,ex,ex]});
   teacherSchema.find({})
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
}

exports.getTeacherById = (req, res, next) => 
{
   // let ID=req.params.id;
   // let ex ={ _id:ID,fullname:"Islam Mosad",password:"12345", email:"islam@yahoo.com" , image:"male" };
   // res.status(200).json({getTeacherById:{ex}});

   teacherSchema.findOne({_id:req.params.id})
   .then((data)=>{
      if(!data) throw new Error("Teacher not found");
      res.status(200).json(data)
   })
   .catch((error)=>next(error));
}

exports.addTeacher = (req, res, next) => 
{
   // res.status(200).json({teacherData:"Inserted teacher","body":req.body});

   // const saltRounds = 10;
   // const hash = bcrypt.hashSync(req.body.password, saltRounds);
   // req.body.password = hash;
   
   const newTeacher=new teacherSchema(req.body);
   newTeacher.save()
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
}


exports.updateTeacher = (req, res, next) => 
{
   // res.status(200).json({teacherData:"Updated teacher","body":req.body});
   const { _id, ...updateData } = req.body;
   teacherSchema.findOneAndUpdate(
      { _id },
      { $set: updateData },
      { new: true, runValidators: true }
   ) 
   .then((updatedTeacher) => {
      if (!updatedTeacher) throw new Error("Teacher not found");
      res.status(200).json(updatedTeacher);
   })
   .catch((error) => next(error));
   /**
    * findOneAndUpdate is used to find the teacher by its _id and update only the fields included in the updateData object. 
    * The new: true option ensures that the updated document is returned, 
    * and runValidators: true enables validation of the updated fields.
    */
}

exports.deleteTeacher = (req, res, next) => 
{
   // let ID=req.params.id;
   // res.status(200).json({teacherData:"Deleted teacher","_id":ID});
   teacherSchema.deleteOne({_id:req.params.id})
   .then((data)=>{
      if(!data) throw new Error("Teacher not found");
      res.status(200).json(data)
   })
   .catch((error)=>next(error));
}

exports.getAllSupervisors = (req, res, next) => 
{
   // res.status(200).json({supervisors:[{},{},{}]});
   classSchema.find().populate({path:"supervisor"})
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
}