import express from "express"
import protect from "../middleware/authMiddleware.js"

import {createRoom,joinRoom,getMyRoom} from "../controllers/roomController.js"

const router = express.Router()

router.post("/create",protect,createRoom)

router.post("/join",protect,joinRoom)

router.get("/my-room",protect,getMyRoom)

export default router