function ChatLeft({messages,user}){

return(

<div className="p-4 h-full overflow-y-auto">

<h2 className="text-xl font-bold mb-4">
Partner Chat
</h2>

{messages
.filter(m=>m.sender !== user?._id)
.map((m,i)=>(

<div key={i} className="bg-pink-500 p-3 rounded mb-2 w-fit">
{m.text}
</div>

))}

</div>

)

}

export default ChatLeft