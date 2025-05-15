import { Response } from "express";
import { createPost, getPostById, getPosts } from "./post.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export const getPostsController = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const posts = await getPosts(req.user.id);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts: " + error });
  }
};

export const getPostByIdController = async (
  req: AuthRequest,
  res: Response
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid post ID" });
    return;
  }

  try {
    const post = await getPostById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post: " + error });
  }
};

export const createPostController = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { title, content } = req.body;

  try {
    await createPost(req.user!.id, title, content);
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating post: " + error });
  }
};
