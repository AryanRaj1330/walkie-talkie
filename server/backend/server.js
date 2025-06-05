import express from "express"
import chats from "./data/data.js"
import env from "dotenv"
import cors from "cors"
import mongoConnection from "./config/db.js"

env.config()
mongoConnection()

const app= express()
app.use(cors())

app.get("/",(req,res)=>{
    res.send("App is running")
})

app.get("/api/chats",(req,res)=>{
    try {
    res.send(chats)
  } catch (error) {
    console.error("Error in /api/chats:", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/api/chats/:id",(req,res)=>{
    // console.log(req.params.id)
    const singleChat= chats.find((e)=> e._id=== req.params.id)
    if(singleChat) res.send(singleChat)
    else res.send("Id is not present, Please input a valid Id") 
})

const PORT= process.env.PORT ||5050

app.listen(PORT,console.log(`Server started on port ${PORT}`))