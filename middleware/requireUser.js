const jwt = require("jsonwebtoken");
const { error } = require("../utils/reponseWrapper");
module.exports = async (req, res, next) => {
  // the job of this middleware is to check whether auth. header is present in the request
  // and if present :: it should be valid to proceed further
  const authHeaders = req.headers; //fetch the header from req.header
  if (
    !authHeaders ||
    !authHeaders.authorization ||
    !authHeaders.authorization.startsWith("Bearer")
  ) {
    //return res.status(401).send("Authorization header is required");
    return res.send(error(401, "Authorization header is required"));
  }
  // token exists: [could be valid or invalid]
  const accessToken = authHeaders.authorization.split(" ")[1]; //fetch the token as it starts with "'space'[token]"
  //verify the Access Token
  try {
    //is accessToken made by our server [verify it using TOKEN_SEC_KEY]
    const decoded = jwt.verify(accessToken, process.env.TOKEN_SEC_KEY);
    //if verified:: pass the id for other controllers/middlewares
    req._id = decoded._id;
  } catch (err) {
    //return res.status(401).send("Invalid Access Key");
    return res.send(error(401, "Invalid Access Key"));
  }
  next(); //will call the next method which is in the router's parameter
};
