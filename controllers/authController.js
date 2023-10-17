const { success, error } = require("../utils/reponseWrapper");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const signupController = async (req, res) => {
  try {
    const { email, password, name } = req.body; //fetch the email ,password from req.body
    if (!email || !password || !name)
      // return res.status(400).send("Email and password required!"); //if either of 2 is missing
      return res.send(error(400, "All fields are required!"));
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.send(error(409, "Email is already registered"));
    //if user is new, encrypt its password and create new entry in db
    const decryptPass = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: decryptPass,
    });
    return res.send(success(201, "new user created successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send(error(400, "Email and password required for login!"));
    const user = await User.findOne({ email }).select("+password"); //by default password is hidden :: therefore include it manually
    // Invalid credential:: user does not exists
    if (!user) return res.send(error(404, "User Not Found"));
    //compare if the given password is correct
    const isPassCorrect = await bcrypt.compare(password, user.password); //compares the given password with old encrypted pass
    if (!isPassCorrect) return res.send(error(500, "Invalid password"));
    //create the AccessToken for the user with parameters as: object_id [could be anything]
    const accessToken = generateToken({ _id: user._id });
    //refresh token is used to re-generate access token for the user without the need of re-login
    const refreshToken = generateRefreshToken({ _id: user._id });
    // Access Token need to stored in local storage of frontEnd:
    //Refresh Token need to stored in cookies
    res.cookie("jwt", refreshToken, {
      secure: true,
      httpOnly: true, // will be accessed only to backend not frontend
    });
    return res.send(success(201, { accessToken }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//Internal functions::
function generateToken(payload) {
  try {
    const TOKEN_SEC_KEY = process.env.TOKEN_SEC_KEY; //fetch the token key
    return jwt.sign(payload, TOKEN_SEC_KEY, {
      expiresIn: "1d",
    }); //use sign method of JWT to create & return accessToken
  } catch (error) {
    console.log(error);
  }
}
module.exports = { signupController, loginController };
