const Post = require("../model/Post");
const User = require("../model/User");
const { mapPostOutput } = require("../utils/postUtils");
const cloudinary = require("cloudinary").v2;
const { success, error } = require("../utils/reponseWrapper");
//controller to create new post
const createPostController = async (req, res) => {
  const { caption, postImg } = req.body;
  try {
    if (!caption || !postImg)
      return res.send(error(404, "caption and post Image are required"));
    const owner = req._id;
    //set the post image in cloudinary::
    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImage",
    });
    const user = await User.findById(owner); //find the user to whom this post belong
    const post = await Post.create({
      owner,
      caption,
      image: {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      },
    });
    user.posts.push(post._id); //push the post id into the posts array of User schema
    await user.save(); // to update changes to user schema
    return res.send(success(201, { post }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
// controller to like and dislike
const likeAndDislikeController = async (req, res) => {
  const { postId } = req.body;
  const currUserId = req._id; // viewer of the post

  try {
    const post = await Post.findById(postId).populate("owner");
    if (!post) return res.send(error(404, "Post not found"));
    // if user present :: means user already liked the post
    if (post.likes.includes(currUserId)) {
      const index = post.likes.indexOf(currUserId);
      post.likes.splice(index, 1); //delete 1 element present at index:
    } else {
      //like the post
      post.likes.push(currUserId); //add curr user id
    }
    await post.save();
    return res.send(success(200, mapPostOutput(post, currUserId)));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//controller to updatePost
const updatePostController = async (req, res) => {
  const { postId, newCaption } = req.body;
  const currUserId = req._id;
  try {
    const currUser = await User.findById(currUserId);
    if (currUser.posts.length === 0)
      return res.send(error(400, "user have no post to update"));
    const post = await Post.findById(postId);
    if (!post) return res.send(error(404, "no such post found"));
    //user cannot update another's post:
    if (post.owner.toString() !== currUserId)
      return res.send(error(403, "you have no admin rights on this post"));
    post.caption = newCaption;
    await post.save();
    return res.send(success(200, "post updated"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//delete Post
const deletePostController = async (req, res) => {
  const { postId } = req.body;
  const currUserId = req._id;
  try {
    const post = await Post.findById(postId);
    const currUser = await User.findById(currUserId);
    if (!post) return res.send(error(404, "post not found"));
    if (post.owner.toString() !== currUserId)
      return res.send(error(400, "you have no admin rights on this post"));
    await Post.deleteOne({ postId }); //delete that post from Post collections
    //delete from Users posts array as well
    const index = currUser.posts.indexOf(postId);
    currUser.posts.splice(index, 1);
    await post.save();
    await currUser.save();
    return res.send(success(200, "post deleted"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
module.exports = {
  createPostController,
  likeAndDislikeController,
  updatePostController,
  deletePostController,
};
