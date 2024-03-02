const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: Array,
    created_at:{
        type:Date,
        default: Date.now()
    },
    user: Object,
    comment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Questions",questionSchema);