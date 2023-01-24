const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    
    address: {
        type:String,
        required:true
    },
    boughtProjects:{
        type:[Number],
    },
    projectsCreated:{
        type:[Number],
    },
    // 2 arrays to store the project Ids of invested and created
})

const User = mongoose.model('User', UserSchema)
module.exports = User