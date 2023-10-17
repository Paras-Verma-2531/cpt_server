const authRouter = require("./authRouter");
const mainRouter = require("express").Router();
mainRouter.get('/',(req,res)=>res.send("in the main Router"))
mainRouter.use("/auth", authRouter);
module.exports=mainRouter;