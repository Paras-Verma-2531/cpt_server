const express = require("express");
const connectDb = require("./dbConnect");
const mainRouter = require("./routers/mainRouter");
require("dotenv").config({ path: "./config.env" });
const App = express();
//middlewares
App.use(express.json());
const PORT_NO = process.env.PORT_NO;
//connection to database
connectDb();
//router configuration
App.use("/api", mainRouter);
App.listen(PORT_NO, () => {
  console.log("listening on port no: ", PORT_NO);
});
