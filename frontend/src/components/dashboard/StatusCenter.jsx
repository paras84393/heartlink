import { useState,useEffect } from "react"

function StatusCenter({socket,room,user}){

const [myStatus,setMyStatus] = useState({
activity:"sleep",
mood:"😊"
})

const [partnerStatus,setPartnerStatus] = useState({
activity:"sleep",
mood:"😊"
})

const gifs = {
sleep:"https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
study:"https://media.giphy.com/media/3orieYJ5E6MBrv0YSI/giphy.gif",
gaming:"https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",
eat:"https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
}


useEffect(()=>{

socket.on("receiveStatus",(data)=>{

if(data.sender !== user._id){
setPartnerStatus({
activity:data.activity,
mood:data.mood
})
}

})

return ()=>socket.off("receiveStatus")

},[user])


const updateStatus = (activity,mood)=>{

setMyStatus({activity,mood})

socket.emit("updateStatus",{
roomId:room._id,
activity,
mood,
sender:user._id
})

}

return(

<div className="flex flex-col items-center justify-start h-full gap-6 p-6 w-full bg-[#0f172a]">
<h2 className="text-2xl font-bold text-pink-400">
Live Status
</h2>


{/* PARTNER STATUS */}

<div className="w-full bg-slate-800 rounded-2xl p-4 shadow-lg flex flex-col items-center">

<p className="text-sm text-gray-400 mb-1">
Partner
</p>

<p className="text-4xl">
{partnerStatus.mood}
</p>

<img
src={gifs[partnerStatus.activity] || gifs.sleep}
className="w-32 h-32 rounded-xl mt-2"
/>

<p className="capitalize mt-2 text-gray-300">
{partnerStatus.activity}
</p>

</div>



{/* YOUR STATUS */}

<div className="w-full bg-slate-900 border border-gray-700 rounded-2xl p-4 shadow-lg flex flex-col items-center">

<p className="text-sm text-gray-400 mb-1">
You
</p>

<p className="text-4xl">
{myStatus.mood}
</p>

<img
src={gifs[myStatus.activity] || gifs.sleep}
className="w-32 h-32 rounded-xl mt-2"
/>

<p className="capitalize mt-2 text-gray-300">
{myStatus.activity}
</p>

</div>



{/* ACTIVITY BUTTONS */}

<div className="grid grid-cols-2 gap-3 mt-4 w-full">

<button
onClick={()=>updateStatus("study","📚")}
className="bg-green-500 hover:bg-green-600 py-2 rounded-lg"
>
Study
</button>

<button
onClick={()=>updateStatus("gaming","🎮")}
className="bg-blue-500 hover:bg-blue-600 py-2 rounded-lg"
>
Gaming
</button>

<button
onClick={()=>updateStatus("sleep","😴")}
className="bg-purple-500 hover:bg-purple-600 py-2 rounded-lg"
>
Sleep
</button>

<button
onClick={()=>updateStatus("eat","🍔")}
className="bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg"
>
Eat
</button>

</div>



{/* MOOD SELECTOR */}

<div className="flex gap-4 text-3xl mt-2 bg-[#0f172a]">

<span onClick={()=>updateStatus(myStatus.activity,"😊")} className="cursor-pointer hover:scale-125 transition">
😊
</span>

<span onClick={()=>updateStatus(myStatus.activity,"😔")} className="cursor-pointer hover:scale-125 transition">
😔
</span>

<span onClick={()=>updateStatus(myStatus.activity,"😡")} className="cursor-pointer hover:scale-125 transition">
😡
</span>

<span onClick={()=>updateStatus(myStatus.activity,"😍")} className="cursor-pointer hover:scale-125 transition">
😍
</span>

<span onClick={()=>updateStatus(myStatus.activity,"🥱")} className="cursor-pointer hover:scale-125 transition">
🥱
</span>

</div>

</div>

)

}

export default StatusCenter