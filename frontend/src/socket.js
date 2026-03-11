import { io } from "socket.io-client"

const socket = io("http://heartlink-k62t.onrender.com",{
withCredentials:true
})

export default socket