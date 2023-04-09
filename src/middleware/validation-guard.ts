import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
// answers the request if an error if there were any data validation errors
export const validationGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ err: errors.array() });
  next();
};
