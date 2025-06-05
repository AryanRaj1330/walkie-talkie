import express from "express"
import chats from "./data/data.js"
import env from "dotenv"
import cors from "cors"
import mongoConnection from "./config/db.js"
import router from "./routes/userRoutes.js"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"

env.config()
mongoConnection()

const app= express()
app.use(cors())

app.use(express.json()) // for backend to accept the json from frontend

app.get("/",(req,res)=>{
    res.send("App is running")
})

app.use("/api/user",router)

// app.get("/api/chats",(req,res)=>{
//     try {
//     res.send(chats)
//   } catch (error) {
//     console.error("Error in /api/chats:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// })

// app.get("/api/chats/:id",(req,res)=>{
//     // console.log(req.params.id)
//     const singleChat= chats.find((e)=> e._id=== req.params.id)
//     if(singleChat) res.send(singleChat)
//     else res.send("User not found") 
// })

app.use(notFound);
app.use(errorHandler);

const PORT= process.env.PORT ||5050||3000||8000

app.listen(PORT,console.log(`Server started on port ${PORT}`))