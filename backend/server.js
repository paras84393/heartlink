
import express from "express"
import http from "http"
import { Server } from "socket.io"

import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())

// allowed frontend origins
const allowedOrigins = [
  "https://heartlink-phi.vercel.app",
  "http://localhost:5173"
]

// CORS config
app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))

app.get("/", (req,res)=>{
  res.send("HeartLink backend running 🚀")
})

app.use("/api/auth", authRoutes)
app.use("/api/room", roomRoutes)

const server = http.createServer(app)

// SOCKET.IO
const io = new Server(server,{
  cors:{
    origin: allowedOrigins,
    methods:["GET","POST"],
    credentials:true
  }
})

io.on("connection",(socket)=>{

  console.log("User connected:",socket.id)

  socket.on("joinRoom",(roomId)=>{
    socket.join(roomId)
    console.log("joined room",roomId)
  })

  socket.on("sendMessage",(data)=>{

    io.to(data.roomId).emit("receiveMessage",{
      text:data.text,
      sender:data.sender
    })

  })

  socket.on("updateStatus",(data)=>{

    io.to(data.roomId).emit("receiveStatus",{
      activity:data.activity,
      mood:data.mood,
      sender:data.sender
    })

  })

  socket.on("disconnect",()=>{
    console.log("User disconnected")
  })

})

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})

