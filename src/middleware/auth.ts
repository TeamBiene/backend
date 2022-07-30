import { Request, Response, NextFunction } from "express";

type AuthorizeOptions = {};

function authorize(options: AuthorizeOptions = {}) {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}

export default authorize;
