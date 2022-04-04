import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidatorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // here we make validation. Also here we can transform returned object (for example to satisfy the Swagger API)
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    }
    res.status(400).send({
        data: {},
        errorsMessages: errors
            .array()
            .map((e) => ({ message: e.msg, field: e.value })),
    });
};
