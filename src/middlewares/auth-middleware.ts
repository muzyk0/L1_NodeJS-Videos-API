import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { token } = req.query;

    if (token === "123") {
        next();
    } else {
        res.sendStatus(401);
    }
};
