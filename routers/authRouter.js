const { signupController, loginController } = require('../controllers/authController');

const authRouter=require('express').Router();
authRouter.post('/signup',signupController);
authRouter.post("/login", loginController);
module.exports=authRouter;