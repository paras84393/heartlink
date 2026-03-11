import Room from "../models/Room.js"
import User from "../models/userModel.js"
import generateCode from "../utils/generateCode.js"


/** CREATE ROOM */

export const createRoom = async (req,res)=>{

    try{

        console.log("REQ USER:",req.user)

        const userId = req.user

        // check if user already has a room
        const existingRoom = await Room.findOne({
            $or:[
                {creator:userId},
                {partner:userId}
            ]
        })

        if(existingRoom){
            return res.status(400).json({
                message:"You already have a room"
            })
        }

        // generate unique invite code
        let code
        let roomExists = true

        while(roomExists){
            code = generateCode()
            roomExists = await Room.findOne({inviteCode:code})
        }

        // create room
        const room = await Room.create({
            creator:userId,
            inviteCode:code
        })

        // update user with room id
        await User.findByIdAndUpdate(userId,{
            room:room._id
        })

        res.status(200).json({
            message:"Room created",
            inviteCode:room.inviteCode
        })

    }catch(error){

        console.log("CREATE ROOM ERROR:",error)

        res.status(500).json({
            message:error.message
        })

    }

}


/** JOIN ROOM */

export const joinRoom = async (req,res)=>{

    try{

        const {code} = req.body
        const userId = req.user

        const room = await Room.findOne({inviteCode:code})

        if(!room){
            return res.status(404).json({
                message:"Room not found"
            })
        }

        if(room.partner){
            return res.status(400).json({
                message:"Room already full"
            })
        }

        // add partner
        room.partner = userId
        await room.save()

        // update user room
        await User.findByIdAndUpdate(userId,{
            room:room._id
        })

        res.json({
            message:"Joined room"
        })

    }catch(error){

        console.log("JOIN ROOM ERROR:",error)

        res.status(500).json({
            message:error.message
        })

    }

}


/** GET MY ROOM */

export const getMyRoom = async (req,res)=>{

    try{

        const room = await Room.findOne({
            $or:[
                {creator:req.user},
                {partner:req.user}
            ]
        })
        .populate("creator","name email")
        .populate("partner","name email")

        res.json(room)

    }catch(error){

        console.log("GET ROOM ERROR:",error)

        res.status(500).json({
            message:error.message
        })

    }

}