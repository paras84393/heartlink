import { FaHeart, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa"

function Footer(){

return(

<footer className="bg-gray-900 text-white py-16">

<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

{/* Logo + About */}

<div>

<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
CoupleSync <FaHeart className="text-pink-500"/>
</h2>

<p className="text-gray-400 text-sm">
Stay connected with your partner and share every moment together.
</p>

</div>

{/* Quick Links */}

<div>

<h3 className="font-semibold mb-4">Quick Links</h3>

<ul className="space-y-2 text-gray-400">

<li className="hover:text-white cursor-pointer">Home</li>
<li className="hover:text-white cursor-pointer">Features</li>
<li className="hover:text-white cursor-pointer">How It Works</li>
<li className="hover:text-white cursor-pointer">Testimonials</li>

</ul>

</div>

{/* Social Links */}

<div>

<h3 className="font-semibold mb-4">Connect</h3>

<div className="flex gap-4 text-xl text-gray-400">

<FaInstagram className="hover:text-pink-400 cursor-pointer"/>
<FaGithub className="hover:text-white cursor-pointer"/>
<FaLinkedin className="hover:text-blue-400 cursor-pointer"/>

</div>

</div>

</div>

{/* Bottom */}

<div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">

© 2026 HeartLink. Made with ❤️

</div>

</footer>

)

}

export default Footer