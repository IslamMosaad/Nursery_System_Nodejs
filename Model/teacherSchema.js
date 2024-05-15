const mongoose=require("mongoose");

const teacherSchema=mongoose.Schema({
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    image: String 
})




module.exports = mongoose.model('Teachers', teacherSchema);