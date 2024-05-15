const mongoose=require("mongoose");




const classSchema=mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teachers', required: true },
    children: [{ type: Number, ref: 'Children' }]
  
})




module.exports = mongoose.model('Classes', classSchema);