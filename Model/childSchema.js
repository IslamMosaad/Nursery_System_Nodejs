const mongoose=require("mongoose");

const AutoIncrementFactory = require('mongoose-sequence');
let connectionstring="mongodb://127.0.0.1:27017/Nursery"; 
const conn = mongoose.createConnection(connectionstring);
const AutoIncrement = AutoIncrementFactory(conn);



const addressSchema=mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
},{ _id: false});

const childSchema=mongoose.Schema({
    _id: Number,
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: { type: String, enum: ['PreKG', 'KG1', 'KG2'], required: true },
    address: addressSchema,
});

childSchema.plugin(AutoIncrement, {inc_field: '_id'});


module.exports = mongoose.model('Children', childSchema);