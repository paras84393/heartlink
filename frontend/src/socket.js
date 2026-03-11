import { io } from "socket.io-client"

const socket = io("https://heartlink-k62t.onrender.com",{
withCredentials:true
})

export default socket