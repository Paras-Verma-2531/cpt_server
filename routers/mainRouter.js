/*
this file configures all the routers::
*/
const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");
const mainRouter = require("express").Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/post", postRouter);
mainRouter.use("/user", userRouter);
module.exports = mainRouter;
