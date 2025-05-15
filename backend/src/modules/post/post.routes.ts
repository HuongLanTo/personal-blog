import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { getPostsController, createPostController, getPostByIdController } from "./post.controller";

const router = Router();

router.get("/", authenticate, getPostsController);
router.post("/", authenticate, createPostController);

export default router;
