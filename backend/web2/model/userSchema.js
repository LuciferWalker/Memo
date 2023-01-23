const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        
    },
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

const Creator = mongoose.model('User', userSchema)
module.exports = User