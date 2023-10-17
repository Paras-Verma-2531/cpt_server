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
    //return res.status(201).json({newUser});
    return res.send(success(201, "new user created successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const loginController = async (req, res) => {
  res.send("in the login controller");
};
module.exports = { signupController, loginController };
