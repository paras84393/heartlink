import mongoose from "mongoose";

const connectDB = async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTEd")

    }catch (error){
        console.log(error)
        process.exit(1)

    }
}
export default connectDB