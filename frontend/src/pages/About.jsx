import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function About(){

const [user,setUser] = useState(null)

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

},[])

return(

<>
<Navbar/>

<div className="min-h-screen flex items-center justify-center bg-pink-50">

<div className="bg-white shadow-lg rounded-xl p-10 w-[420px]">

<h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
About Account
</h1>

{user ? (

<div className="space-y-5">

<div>
<p className="text-gray-500 text-sm">Name</p>
<p className="font-semibold text-lg">{user.name}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Email</p>
<p className="font-semibold text-lg">{user.email}</p>
</div>

<div>
<p className="text-gray-500 text-sm">User ID</p>
<p className="font-semibold text-sm text-gray-700">
{user._id}
</p>
</div>

<div className="pt-4 border-t text-center text-sm text-gray-400">
HeartLink Account Information
</div>

</div>

) : (

<p className="text-center text-gray-500">
Loading user info...
</p>

)}

</div>

</div>

</>

)

}

export default About