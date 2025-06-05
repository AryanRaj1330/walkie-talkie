import mongoose from "mongoose"
import env from "dotenv"
env.config()

const connection=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(`error= ${error.message}`)
        process.exit()      
    }
}

connection()

export default connection