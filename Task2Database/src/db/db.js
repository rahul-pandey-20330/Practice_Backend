//is file me hm apne database ko server se connect krne ka code likhte hai
// require mongoose
const mongoose = require("mongoose");

//ek function create krenge jisme hm mongoose ko connect krne ka logic likhenge
async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
    });

    console.log("connected to DB");
}
// hme ab connectDB function ko export krna hoga taki ise hm database ke files me use kr paye 
module.exports = connectDB