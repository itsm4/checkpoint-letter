import type { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implémenter la vérification du token
  next();
}; 