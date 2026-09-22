//isme bhi hme mongoose ko require krna pdega
const mongoose = require("mongoose")

//now ab hme apne notes naam ka schema bnana hai jisme hm apne notes ke data ko enter krenge
const noteSchema = new mongoose.Schema({
    title : String,
    description : String
})
// now ab hme apne database me crud operation perform krne ke liye ek note model create krna pdega and then use export bhi krna hoga
 const noteModel = mongoose.model("note",noteSchema)
 module.exports = noteModel