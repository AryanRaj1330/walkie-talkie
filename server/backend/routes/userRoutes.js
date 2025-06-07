import express from "express"
import { registerUser,authUser,allUsers } from "../controllers/userControllers.js"
const router=express.Router()
import protect from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect,allUsers)
router.post("/login",authUser)

export default router