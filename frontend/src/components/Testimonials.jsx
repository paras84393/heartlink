import { useEffect } from "react"
import gsap from "gsap"

function Testimonials(){

useEffect(()=>{

const cards = gsap.utils.toArray(".testimonialCard")

gsap.fromTo(
cards,
{ y:80, opacity:0 },
{ y:0, opacity:1, duration:1, stagger:0.3 }
)

},[])

const testimonials = [
{
name:"Aarav & Meera",
text:"This app keeps us connected all day. We love sharing our status ❤️"
},
{
name:"Rohit & Ananya",
text:"The real time updates make our relationship feel closer."
},
{
name:"Kabir & Siya",
text:"Best couple app we have used. Super simple and fun!"
}
]

return(

<section className="py-28 bg-white">

<h2 className="text-4xl font-bold text-center mb-16">
Loved by Couples ❤️
</h2>

<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">

{testimonials.map((t,i)=>(
<div key={i}
className="testimonialCard bg-pink-50 p-8 rounded-xl shadow-lg
hover:-translate-y-3 hover:shadow-pink-200/60
transition-all duration-300">

<p className="text-gray-600 mb-6">
"{t.text}"
</p>

<h4 className="font-semibold text-pink-600">
{t.name}
</h4>

</div>
))}

</div>

</section>

)

}

export default Testimonials