// this file contains the userSchema
const mongoose = require("mongoose");
//define the Structure for the user
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // exclude passwords in the query result
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    //Image will be stored at cloudinary and url will be stored in db
    avatar: {
      publicId: String,
      url: String,
    },
    //refers to the users who follows the current user :: me
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId, //fetch the object id from db
        ref: "user",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // used as reference:: should be name of the another schema
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId, //fetch the object id from db
        ref: "post",
      },
    ],
  },
  {
    timestamps: true, // will provide the info about created At and updated At::
  }
);
module.exports = mongoose.model("user", userSchema);
