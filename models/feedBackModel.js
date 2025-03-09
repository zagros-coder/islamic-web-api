const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    stars:{
        type:String,
        required:true
    }
},{ timestamps: true });

const Feed = mongoose.model("Feed",feedSchema);


module.exports = Feed;