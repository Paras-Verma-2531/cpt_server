//post util to modify the post response sent on the profile ::
var time = require("time-ago"); //used time-ago library for timeAgo functionality
const mapPostOutput = (post, userId) => {
  return {
    _id: post._id,
    caption: post.caption,
    image: post.image,
    owner: {
      _id: post.owner._id,
      name: post.owner.name,
      avatar: post.owner.avatar,
    },
    likesCount: post.likes.length,
    isLiked: post.likes.includes(userId),
    timeAgo: time.ago(post.createdAt),
  };
};
module.exports = { mapPostOutput };
