const classSchema = require("../Model/classSchema");
exports.getAllClasses = (req, res, next) => {
   // res.status(200).json({ classes: [{}, {}, {}] });
   classSchema.find({})
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
};

exports.getClassById = (req, res, next) => {
   // let ex={_id:30,name:"Class 1",supervisor:"562b2649b2e70464f113c04d",children:[1,2,3]};
   // res.status(200).json(ex);
   classSchema.findOne({_id:req.params.id})
   .then((data)=>{
      if(!data) throw new Error("class not found");
      res.status(200).json(data)
   })
   .catch((error)=>next(error));

};

exports.addClass = (req, res, next) => {
   // res.status(200).json({ classData: "Inserted Class" });
   const newClass=new classSchema(req.body);
   newClass.save()
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
};

exports.updateClass = (req, res, next) => {
   // res.status(200).json({ classData: "Updated Class" });
   const { _id, ...updateData } = req.body;
   classSchema.findOneAndUpdate(
      { _id },
      { $set: updateData },
      { new: true, runValidators: true }
   ) 
   .then((updatedClass) => {
      if (!updatedClass) throw new Error("Teacher not found");
      res.status(200).json(updatedClass);
   })
   .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
   // res.status(200).json({ classData: `Deleted Class ${req.params.id}` });
   classSchema.deleteOne({_id:req.params.id})
   .then((data)=>{
      if(!data) throw new Error("class not found");
      res.status(200).json(data)
   })
   .catch((error)=>next(error));
};

exports.getClassChildren = (req, res, next) => {
   // res.status(200).json({ classData: `getClassChildren ${req.params.id}` });
   classSchema.findOne({_id:req.params.id}).populate({path:"children",select:"fullName"})
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
};

exports.getClassSupervisor = (req, res, next) => {
   // res.status(200).json({ classData: `getClassSupervisor ${req.params.id}` });
   classSchema.findOne({_id:req.params.id}).populate({path:"supervisor",select:"fullname"})
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
};
