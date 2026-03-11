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

app.use(cors({
origin: "https://heartlink-phi.vercel.app",
credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/room",roomRoutes)

const server = http.createServer(app)

const io = new Server(server,{
cors:{
origin: "https://heartlink-phi.vercel.app",
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