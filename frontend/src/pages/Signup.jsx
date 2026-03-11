import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Signup(){

const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
password:""
})

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit = async (e)=>{
e.preventDefault()

try{

const res = await fetch("https://heartlink-k62t.onrender.com/api/auth/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
credentials:"include",
body:JSON.stringify(form)
})


const data = await res.json()

if(res.ok){
navigate("/dashboard")
}else{
alert(data.message)
}

}catch(err){
console.log(err)
}

}

return(

<div className="w-full h-screen flex items-center justify-center bg-pink-50">

<div className="bg-white p-10 rounded-xl shadow-lg w-[350px]">

<h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
Create Account
</h2>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">

<input
type="text"
name="name"
placeholder="Your Name"
className="border p-2 rounded"
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email"
className="border p-2 rounded"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
className="border p-2 rounded"
onChange={handleChange}
required
/>

<button
className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
>
Signup
</button>

</form>

<p className="text-center text-sm mt-4">
Already have account? 
<Link to="/login" className="text-pink-600 font-semibold ml-1">
Login
</Link>
</p>

</div>

</div>

)

}

export default Signup