const mongoose = require('mongoose');


const connectDb=async ()=>{
    try {
        mongoose.connect(process.env.CONNECTION_URL)
        
        console.log("connect")

    } catch (error) {
        console.log("error hai ",error)
    }
}
 module.exports= connectDb;