import { db } from "../../db/mysql";
import { Post } from "../../types/post";

export const getPosts = async (userId: number): Promise<Post[]> => {
  const [rows] = await db.query(
    "SELECT * FROM posts WHERE authorId = ? ORDER BY createdAt DESC",
    [userId]
  );
  return rows as Post[];
};

export const getPostById = async (
  id: number
): Promise<{
  id: number;
  title: string;
  content: string;
  authorName: string;
} | null> => {
  const [rows] = await db.query(
    `SELECT posts.id, posts.title, posts.content, users.email AS authorName
       FROM posts
       JOIN users ON posts.authorId = users.id
       WHERE posts.id = ?`,
    [id]
  );

  const result = rows as any[];
  return result.length > 0 ? result[0] : null;
};

export const createPost = async (
  authorId: number,
  title: string,
  content: string
): Promise<void> => {
  await db.query(
    "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
    [title, content, authorId]
  );
};
