const {
  createPostController,
  likeAndDislikeController,
  updatePostController,
  deletePostController,
} = require("../controllers/postController");
const requireUserMiddleware = require("../middleware/requireUser");
const postRouter = require("express").Router();
postRouter.post("/", requireUserMiddleware, createPostController);
postRouter.post("/like", requireUserMiddleware, likeAndDislikeController);
postRouter.put("/update", requireUserMiddleware, updatePostController);
postRouter.delete("/delete", requireUserMiddleware, deletePostController);
module.exports = postRouter;
