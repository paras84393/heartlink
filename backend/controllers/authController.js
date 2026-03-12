import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"


/**===== SIGN UP ============ */
export const register = async (req,res)=>{
    try{

        const {name,email,password} = req.body
    
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = generateToken(user._id)

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
})


        res.status(201).json({
            message:"Signup Success",
            redirect:"/join"
        })

    }catch(error){

        res.status(500).json({error:error.message})

    }
}



/**========== LOGIN ============= */
export const login = async (req,res)=>{

    try{

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const token = generateToken(user._id)

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
})


        // check if user already in room
        if(user.room){

            res.json({
                message:"Login Success",
                redirect:"/dashboard"
            })

        }else{

            res.json({
                message:"Login Success",
                redirect:"/join"
            })

        }

    }catch(error){

        res.status(500).json({error:error.message})

    }

}



/**====== LOGOUT ========= */
export const logout = (req,res)=>{

    res.clearCookie("token")

    res.json({
        message:"Logged out successfully"
    })

}



/**====== GET CURRENT USER ========= */
export const getCurrentUser = async (req,res)=>{

    try{

        const user = await User.findById(req.user)
        .select("-password")
        .populate("room")

        res.json(user)

    }catch(error){

        res.status(500).json({error:error.message})

    }

}