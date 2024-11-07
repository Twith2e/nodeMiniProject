const express = require("express");
const {
  userSignup,
  userLogin,
  verifyToken,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/verify", verifyToken);

module.exports = userRouter;
