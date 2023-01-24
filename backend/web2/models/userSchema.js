const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
    },
    address: {
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    // 2 arrays to store the project Ids of invested and created
})

const Creator = mongoose.model('User', UserSchema)
module.exports = User