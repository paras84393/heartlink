import { FaUserPlus, FaLink, FaComments } from "react-icons/fa"

function HowItWorks(){

const steps = [
{
icon:<FaUserPlus size={35}/>,
title:"Sign Up",
desc:"Create your account and start your journey."
},
{
icon:<FaLink size={35}/>,
title:"Connect Partner",
desc:"Share your unique invite link with your partner."
},
{
icon:<FaComments size={35}/>,
title:"Share Moments",
desc:"Chat and share real-time status with your partner."
}
]

return(

<section className="py-24 bg-pink-50">

<h2 className="text-4xl font-bold text-center mb-16">
How HeartLink Works 💞
</h2>

<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

{steps.map((s,i)=>(
<div key={i}
className="bg-white p-10 rounded-xl text-center shadow-lg hover:-translate-y-3 transition">

<div className="text-pink-500 mb-5 flex justify-center">
{s.icon}
</div>

<h3 className="font-semibold text-xl mb-2">
{s.title}
</h3>

<p className="text-gray-600 text-sm">
{s.desc}
</p>

</div>
))}

</div>

</section>

)

}

export default HowItWorks