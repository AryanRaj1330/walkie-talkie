import express from "express"
import { accessChats } from "../controllers/chatControllers.js"
const router= express.Router()
import protect from "../middleware/authMiddleware.js"

router.route("/").post(protect,accessChats)
// router.route("/").get(protect,fetchChats)
// router.route("/group").post(protect,createGroup)
// router.route("/rename").put(protect,renameGroup)
// router.route("/groupRemove").put(protect,removeFromGroup)
// router.route("/groupAdd").put(protect,addToGroup)

// export {accessChats,fetchChats,createGroup,renameGroup,removeFromGroup,addToGroup}
export default router
