const { signup, login, getUser,forgotPassword, verifyOtp} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();


router.post("/signup", signup)
router.post("/login",login)
router.put("/forgotPassword",forgotPassword)
router.put("/verifyOtp", verifyOtp)
router.get("/get-user",verifyToken,getUser)


 

module.exports = router;