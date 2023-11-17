const {
  followOrUnfollowController,
  getFeedDataController,
  getMyPostsController,
  getUserPostsController,
  deleteMyProfileController,
  getProfileController,
  updateProfileController,
  getUserProfileController,
} = require("../controllers/userController");
const requireUserMiddleware = require("../middleware/requireUser");
const userRouter = require("express").Router();
userRouter.post("/follow", requireUserMiddleware, followOrUnfollowController);
//API to: get posts of his followings:
userRouter.get("/getFeedData", requireUserMiddleware, getFeedDataController);
userRouter.get("/myPosts", requireUserMiddleware, getMyPostsController);
userRouter.post("/userPosts", requireUserMiddleware, getUserPostsController);
//API to delete user's account
userRouter.delete("/", requireUserMiddleware, deleteMyProfileController);
userRouter.get("/getMyProfile", requireUserMiddleware, getProfileController);
userRouter.post(
  "/getUserProfile",
  requireUserMiddleware,
  getUserProfileController
);
userRouter.put("/", requireUserMiddleware, updateProfileController);
module.exports = userRouter;
