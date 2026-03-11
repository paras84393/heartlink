
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Link } from "react-router-dom"

import leftHeart from "../assets/image/Free-Half-Broken-Heart-Vector-removebg-preview.png"
import rightHeart from "../assets/image/WhatsApp_Image_2026-03-08_at_10.39.04_PM-removebg-preview.png"

function Hero(){

const heroRef = useRef()

useEffect(()=>{

const ctx = gsap.context(()=>{

const tl = gsap.timeline()

tl.from(".heroHeading",{
y:60,
opacity:0,
duration:1
})

.from(".heroTagline",{
y:30,
opacity:0,
duration:0.8
})

.from(".leftHeart",{
x:-400,
opacity:0,
duration:1
})

.from(".rightHeart",{
x:400,
opacity:0,
duration:1
},"-=1")

.to(".leftHeart",{
x:-15,
duration:0.5
})

.to(".rightHeart",{
x:30,
duration:0.5
},"-=0.5")

.to(".leftHeart, .rightHeart",{
scale:1.08,
repeat:2,
yoyo:true,
duration:0.25
})

.to(".ctaBtn",{
scale:1,
opacity:1,
duration:0.6
})

}, heroRef)

return () => ctx.revert()

},[])

return(

<section
ref={heroRef}
className="relative h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-pink-50 via-white to-pink-100 overflow-hidden"
>

<div className="absolute top-20 left-10 text-pink-200 text-4xl animate-bounce">❤️</div>
<div className="absolute bottom-20 right-16 text-pink-200 text-3xl animate-pulse">❤️</div>
<div className="absolute top-40 right-32 text-pink-200 text-2xl animate-bounce">❤️</div>

<h1 className="heroHeading text-6xl font-extrabold text-pink-600 mb-4">
Connect Hearts Instantly
</h1>

<p className="heroTagline text-gray-500 text-xl mb-10">
Stay connected with your partner and share every moment ❤️
</p>

<div className="relative w-[220px] h-[200px] mb-10">

<img
src={leftHeart}
className="leftHeart absolute left-0 top-0 w-[200px]"
/>

<img
src={rightHeart}
className="rightHeart absolute right-0 top-0 w-[200px]"
/>

</div>

<Link to="/signup">

<button className="ctaBtn opacity-0 scale-0 bg-pink-500 text-white px-8 py-3 rounded-lg text-lg 
hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-300/50">

Get Started

</button>

</Link>

</section>

)

}

export default Hero

