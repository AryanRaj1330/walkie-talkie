import express from "express"
import { accessChats,fetchChats, createGroup, renameGroup,addToGroup ,removeFromGroup} from "../controllers/chatControllers.js"
const router= express.Router()
import protect from "../middleware/authMiddleware.js"

router.route("/").post(protect,accessChats)
router.route("/").get(protect,fetchChats)
router.route("/group").post(protect,createGroup)
router.route("/rename").put(protect,renameGroup)
router.route("/groupAdd").put(protect,addToGroup)
router.route("/groupRemove").put(protect,removeFromGroup)

export default router
