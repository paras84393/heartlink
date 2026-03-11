import { Link } from "react-router-dom"

function CTA(){

return(

<section className="py-28 bg-gradient-to-r from-pink-500 to-pink-400 text-center text-white relative overflow-hidden">

<h2 className="text-4xl font-bold mb-6">
Ready to Connect with Your Partner? ❤️
</h2>

<p className="mb-10 text-lg opacity-90">
Start sharing your moments and stay closer than ever.
</p>

<Link to="/signup">

<button className="bg-white text-pink-500 px-10 py-4 rounded-full font-semibold
shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300">

Start Your Journey

</button>

</Link>

{/* floating hearts */}

<div className="absolute top-10 left-10 text-white text-3xl opacity-30 animate-bounce">❤️</div>
<div className="absolute bottom-10 right-10 text-white text-2xl opacity-30 animate-pulse">❤️</div>

</section>

)

}

export default CTA