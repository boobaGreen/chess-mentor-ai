import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        name?: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  req.user = {
    id: userId as string,
    email: "test@example.com", // For testing
    name: "Test User", // For testing
  };

  next();
};
