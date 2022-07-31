import { Request, Response, NextFunction } from "express";
import { requireJwtMiddleware } from "../jwt";

type AuthorizeOptions = {};

function authorize(options: AuthorizeOptions = {}) {
  return (req: Request, res: Response, next: NextFunction) => {
    requireJwtMiddleware(req, res, next);
  };
}

export default authorize;
