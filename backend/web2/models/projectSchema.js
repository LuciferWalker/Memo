const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({

    projectId:{
        type:Number,
    },
    image:{
        type:String,
    },
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    tokenContractAddress:{
        type:String,
        required: true,
    },
    creatorIds: {
        type:[String], //[1,2,3]
    },
    cid: {
        type:String,
    },
    projectStatus:{
        type:Boolean,
        default: true
    },
    totalTokens:{
        type:Number
    },
    tokensBought:{
        type:Number
    },
    tokenPrice:{
        type:Number
    }

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
