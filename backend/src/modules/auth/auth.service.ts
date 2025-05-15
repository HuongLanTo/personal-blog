import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../db/mysql";
import { User } from "../../types/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (email: string, password: string) => {
  const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);
  if ((existing as User[]).length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hashedPassword,
  ]);
};

export const authenticateUser = async (email: string, password: string) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const users = rows as User[];

  if (
    users.length === 0 ||
    !(await bcrypt.compare(password, users[0].password))
  ) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: users[0].id, email: users[0].email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
