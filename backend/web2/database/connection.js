const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect("mongodb+srv://Nitish:nitish123@memo.wg7mvas.mongodb.net/?retryWrites=true&w=majority")
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB