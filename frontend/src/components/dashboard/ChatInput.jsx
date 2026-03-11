import { useState } from "react"

function ChatInput({socket,room,user}){

const [message,setMessage] = useState("")

const sendMessage = ()=>{

if(!message || !room) return

socket.emit("sendMessage",{
roomId:room._id,
text:message,
sender:user._id
})

setMessage("")
}

return(

<div className="w-full p-4 bg-[#020617] border-t border-gray-800 flex gap-3">

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
type="text"
placeholder="Type message..."
className="flex-1 p-3 rounded-lg bg-slate-800 text-white outline-none"
/>

<button
onClick={sendMessage}
className="bg-blue-500 hover:bg-blue-600 px-6 rounded-lg"
>
Send
</button>

</div>

)

}

export default ChatInput
