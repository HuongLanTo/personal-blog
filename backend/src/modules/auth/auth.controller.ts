import { Request, Response } from "express";
import { registerUser, authenticateUser } from "./auth.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await registerUser(email, password);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })
      .json({ message: "Login successful." });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const getMe = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  res.json({
    id: req.user.id,
    email: req.user.email,
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logout successful." });
};
