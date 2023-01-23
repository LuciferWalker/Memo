const mongoose = require('mongoose'); //library to help us enforce data schema(dont know much about it)

const DB = process.env.MONGO_URI 

//Connecting mongodb to our server
mongoose.connect(DB).then(() => {
    console.log('our db is connected')
}).catch((err) => console.log(err.message)) 