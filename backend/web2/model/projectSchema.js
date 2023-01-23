const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    id: {

    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    tokenContractAddress:{
        type:String
    },
    creatorIds: {
        type:[Number], //[1,2,3]
    },
    cid: {
        type:[String]
    },
    projectStatus:{
        type:Boolean,
    }

})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project