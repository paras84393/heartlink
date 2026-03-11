import { FaHeart, FaComments, FaMapMarkerAlt, FaBell } from "react-icons/fa"

function Features(){

const features = [
{
icon:<FaHeart size={30}/>,
title:"Real Time Status",
desc:"Share your mood and activity instantly with your partner."
},
{
icon:<FaComments size={30}/>,
title:"Private Chat",
desc:"Chat with your partner in real-time with complete privacy."
},
{
icon:<FaMapMarkerAlt size={30}/>,
title:"Live Activity",
desc:"Know what your partner is doing in real-time."
},
{
icon:<FaBell size={30}/>,
title:"Instant Alerts",
desc:"Get notified when your partner updates their status."
}
]

return(

<section className="py-24 bg-white">

<h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
Why Couples Love HeartLink❤️
</h2>

<div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">

{features.map((f,i)=>(
<div key={i} className="bg-pink-50 p-8 rounded-xl text-center hover:scale-105 transition">

<div className="text-pink-500 mb-4 flex justify-center">
{f.icon}
</div>

<h3 className="font-semibold text-lg mb-2">
{f.title}
</h3>

<p className="text-gray-600 text-sm">
{f.desc}
</p>

</div>
))}

</div>

</section>

)

}

export default Features