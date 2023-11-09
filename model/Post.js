const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId, //fetch the object id from db
      ref: "user",
      required: true,
    },
    image: {
      publicId: String,
      url: String,
    },
    caption: {
      type: String,
      required: true,
    },
    //likes of type array:: to store details of user who like the post
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId, //fetch the object id from db
        ref: "user", // used to make relations in mongodb
      },
    ],
  },
  {
    timestamps: true, // will provide the info about created At and updated At::
  }
);
module.exports = mongoose.model("post", postSchema);
