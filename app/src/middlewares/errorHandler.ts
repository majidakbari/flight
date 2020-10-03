import {Request, Response, NextFunction} from "express";
import AbstractError from "../errors/abstractError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AbstractError) {
        res.status(err.statusCode).json({
            error : "Client Error",
            message : err.message
        });
    } else {
        res.status(500).json({
            error : "Server Error",
            message : "Something went wrong."
        });
    }
    next();
};