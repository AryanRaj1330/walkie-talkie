import express from "express"
import chats from "./data/data.js"
import env from "dotenv"
import cors from "cors"
import mongoConnection from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"
import messageRoutes from "./routes/messageRoutes.js"

env.config()
mongoConnection()

const app= express()
app.use(cors())

app.use(express.json()) // for backend to accept the json from frontend

app.get("/",(req,res)=>{
    res.send("App is running")
})

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT= process.env.PORT ||5050||3000||8000

app.listen(PORT,console.log(`Server started on port ${PORT}`))