import { useEffect, useState } from "react"
import socket from "../socket"

import RoomSetup from "../components/RoomSetup"

import ChatLeft from "../components/dashboard/ChatLeft"
import ChatRight from "../components/dashboard/ChatRight"
import StatusCenter from "../components/dashboard/StatusCenter"
import ChatInput from "../components/dashboard/ChatInput"

function Dashboard(){

const [room,setRoom] = useState(null)
const [messages,setMessages] = useState([])
const [user,setUser] = useState(null)

useEffect(()=>{

const fetchUser = async ()=>{
const res = await fetch("https://heartlink-k62t.onrender.com/api/auth/me",{credentials:"include"})
if(res.ok){
const data = await res.json()
setUser(data)
}
}

const fetchRoom = async ()=>{

const res = await fetch("https://heartlink-k62t.onrender.com/api/room/my-room",{
credentials:"include"
})

if(res.ok){
const data = await res.json()

if(data){
setRoom(data)
socket.emit("joinRoom",data._id)
}
}

}

fetchUser()
fetchRoom()

socket.on("receiveMessage",(msg)=>{
setMessages(prev=>[...prev,msg])
})

return ()=>{
socket.off("receiveMessage")
}

},[])


if(!room){
return <RoomSetup setRoom={setRoom}/>
}

return(

<div className="w-full h-screen flex flex-col bg-[#0f172a] text-white">

<div className="flex flex-1">

<div className="w-1/3 border-r border-gray-700 bg-[#0f172a]">
<ChatLeft messages={messages} user={user}/>
</div>

<div className="w-1/3 border-r border-gray-700 bg-[#0f172a]">
<StatusCenter socket={socket} room={room} user={user}/>
</div>

<div className="w-1/3 bg-[#0f172a]">
<ChatRight messages={messages} user={user}/>
</div>


</div>

<ChatInput socket={socket} room={room} user={user}/>

</div>

)

}

export default Dashboard