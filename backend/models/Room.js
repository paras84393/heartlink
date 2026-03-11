import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({

    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    partner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },

    inviteCode:{
        type:String,
        required:true,
        unique:true
    }

},{
    timestamps:true
})

const Room = mongoose.model("Room",roomSchema)

export default Room