const childSchema = require("../Model/childSchema");

exports.getAllChildern = (req, res, next) => 
{ 
   // res.status(200).json({Childern:[{},{},{}]});
   childSchema.find({})
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
}

exports.getChildById = (req, res, next) => 
{
   // let ID=req.params.id;
   // let childObj={_id:ID,fullName:"Adam",age:4,level:"KG1",address:{city:"Cairo",street:"Sobh",building:"1"}};
   // res.status(200).json(childObj);
   childSchema.findOne({_id:req.params.id})
   .then((data)=>{
      if(!data) throw new Error("child not found");
      res.status(200).json(data)
   })
   .catch((error)=>next(error));
}

exports.addChild = (req, res, next) => 
{
   // res.status(200).json({childData:"Inserted Child"});
   const newChild=new childSchema(req.body);
   newChild.save()
   .then((data)=>{res.status(200).json(data)})
   .catch((error)=>next(error));
}

exports.updateChild = (req, res, next) => 
{
   // res.status(200).json({childData:"Updated Child"});
   const { _id, ...updateData } = req.body;
   childSchema.findOneAndUpdate(
      { _id },
      { $set: updateData },
      { new: true, runValidators: true }
   ) 
   .then((updatedChild) => {
      if (!updatedChild) throw new Error("child not found");
      res.status(200).json(updatedChild);
   })
   .catch((error) => next(error));
}


exports.deleteChild = (req, res, next) => 
{
   // res.status(200).json({childData:"Deleted Child"});
   childSchema.deleteOne({_id:req.params.id})
   .then((data)=>{
      if(!data) throw new Error("child not found");
      res.status(200).json(data)
   })
   .catch((error)=>next(error));
}
