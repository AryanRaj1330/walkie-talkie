import express from "express"
import env from "dotenv"
import cors from "cors"
import mongoConnection from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"
import messageRoutes from "./routes/messageRoutes.js"
import {Server} from "socket.io"

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

const PORT= process.env.PORT ||5000

const server=app.listen(PORT,console.log(`Server started on port ${PORT}`))

const io= new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")
    
    socket.on("setup",(userData)=>{
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat room",(room)=>{
        console.log("User joined the room "+room)
    })

    socket.on("typing",(room)=>{
        socket.in(room).emit("typing")
    })
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing")
    })

    socket.on("new message",(newMessageReceived)=>{
        var chat= newMessageReceived.chat
        if(!chat.users) return console.log("chat.users is not defined")
        
        chat.users.forEach((user)=>{
            if(user._id===newMessageReceived.sender._id) return

            socket.in(user._id).emit("message received",newMessageReceived)
        })
    })
})