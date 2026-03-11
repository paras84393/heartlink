import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import logo from "../assets/image/image.png"

function Navbar() {

const [user,setUser] = useState(null)
const [open,setOpen] = useState(false)

const navRef = useRef()
const dropdownRef = useRef()

// fetch logged in user
useEffect(()=>{

const fetchUser = async ()=>{

try{

const res = await fetch("http://localhost:5000/api/auth/me",{
credentials:"include"
})

if(res.ok){
const data = await res.json()
setUser(data)
}

}catch(err){
console.log(err)
}

}

fetchUser()

// navbar animation
const ctx = gsap.context(()=>{

gsap.from(".navItem",{
y:-40,
opacity:0,
duration:0.7,
stagger:0.1
})

},navRef)

return ()=>ctx.revert()

},[])


// close dropdown on outside click
useEffect(()=>{

const handleClick = (e)=>{
if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
setOpen(false)
}
}

window.addEventListener("click",handleClick)

return ()=>window.removeEventListener("click",handleClick)

},[])


// logout
const logout = async ()=>{

await fetch("http://localhost:5000/api/auth/logout",{
method:"POST",
credentials:"include"
})

window.location.reload()

}

return(

<nav
ref={navRef}
className="sticky top-0 z-50 w-full flex justify-between items-center px-12 py-4 bg-white shadow-md"
>

{/* LEFT LOGO */}

<div className="flex items-center gap-3 navItem">

<img
src={logo}
alt="logo"
className="w-10 h-10"
/>

<h1 className="text-xl font-bold text-pink-600">
HeartLink
</h1>

</div>


{/* RIGHT MENU */}

<div className="flex items-center gap-8">

<Link to="/" className="navItem font-medium hover:text-pink-500">
Home
</Link>

<Link to="/features" className="navItem font-medium hover:text-pink-500">
Features
</Link>


{!user ? (

<div className="flex gap-4 navItem">

<Link
to="/login"
className="text-pink-600 font-medium"
>
Login
</Link>

<Link
to="/signup"
className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
>
Signup
</Link>

</div>

) : (

<div
ref={dropdownRef}
className="relative navItem"
>

{/* Avatar */}

<div
onClick={(e)=>{
e.stopPropagation()
setOpen(prev=>!prev)
}}
className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition"
>

{user.name.charAt(0).toUpperCase()}

</div>


{/* Dropdown */}

{open && (

<div
className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded-lg z-50 overflow-hidden"
>

<Link
to="/about"
className="block px-4 py-2 hover:bg-gray-100 text-sm"
>
About
</Link>

<button
onClick={logout}
className="block px-4 py-2 hover:bg-gray-100 text-sm w-full text-left"
>
Logout
</button>

</div>

)}

</div>

)}

</div>

</nav>

)

}

export default Navbar