const mongoose = require("mongoose");
async function connectDb() {
  const URI = process.env.URI;
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connection successfull');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports=connectDb;