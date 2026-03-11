import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import http from "http"
import { Server } from "socket.io"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"

dotenv.config()

const app = express()

// database
connectDB()

// middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

// routes
app.use("/api/auth",authRoutes)
app.use("/api/room",roomRoutes)

// base route
app.get("/",(req,res)=>{
    res.send("HeartLink API Running ❤️")
})


// ============================
// SOCKET SERVER
// ============================

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})


io.on("connection",(socket)=>{

    console.log("User connected:",socket.id)


    // JOIN ROOM
    socket.on("joinRoom",(roomId)=>{
        socket.join(roomId)
        console.log(`User joined room ${roomId}`)
    })


    // SEND MESSAGE
    socket.on("sendMessage",(data)=>{

        const {roomId,text,sender} = data

        const message = {
            roomId,
            text,
            sender,
            createdAt:new Date()
        }

        io.to(roomId).emit("receiveMessage",message)

    })


    // STATUS UPDATE
    socket.on("updateStatus",(data)=>{

        const {roomId,user,status} = data

        io.to(roomId).emit("receiveStatus",{
            user,
            status
        })

    })


    socket.on("disconnect",()=>{
        console.log("User disconnected:",socket.id)
    })

})


// ============================

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})