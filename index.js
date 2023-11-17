const express = require("express");
require("dotenv").config({ path: "./config.env" }); //set the path to config.env location
const cloudinary = require("cloudinary").v2;
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./dbConnect");
const mainRouter = require("./routers/mainRouter");
const App = express();

// config cloudinary::
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//middlewares::
App.use(express.json({ limit: "10mb" })); // used to parse body :: limit --> amount of data that can be parsed
App.use(morgan("common")); // morgan middleware used to create logs
App.use(cookieParser()); // used to parse data inside cookies
App.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // request from this origin can now access our backend
  })
); // To include Access control policy such that our backend allows resources to accessed from other loc.
//Routers::
App.use("/api", mainRouter);
connectDb(); //connection establishment with the cloud database
const PORT = process.env.PORT; //fetch the port from config.env file
App.listen(PORT, () => {
  console.log("listening on port :", PORT);
});
