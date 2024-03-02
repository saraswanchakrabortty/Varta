const mongoose = require('mongoose')
const url = "mongodb+srv://abhik:abhik1234@help.f3df8tt.mongodb.net/stackhelp?retryWrites=true&w=majority"

module.exports.connect = ()=>{
    mongoose.connect(url).then((res)=> console.log("MongoDb connected")).
    catch((err)=> console.log("Error:",err))
}