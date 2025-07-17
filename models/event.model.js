const mongoose= require("mongoose");

const eventSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    description: String,
    date:{
        type:Date,
        required: true,
    },
    location: String,
    price:{
        type:Number,
        default:0,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

},{timestamps:true});
module.exports = mongoose.model("event", eventSchema);
