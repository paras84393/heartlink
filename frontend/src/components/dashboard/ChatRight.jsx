function ChatRight({messages,user}){

return(

<div className="p-4 h-full flex flex-col items-end overflow-y-auto">

<h2 className="text-xl font-bold mb-4">
Your Chat
</h2>

{messages
.filter(m=>m.sender === user?._id)
.map((m,i)=>(

<div key={i} className="bg-blue-500 p-3 rounded mb-2 w-fit">
{m.text}
</div>

))}

</div>

)

}

export default ChatRight