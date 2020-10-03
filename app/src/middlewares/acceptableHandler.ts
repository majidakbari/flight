import {RequestHandler} from "express";
import NotAcceptableError from "../errors/notAcceptableError";

export const acceptableHandler: RequestHandler = (req, res, next) => {
    const acceptHeader = req.header("accept");
    if (acceptHeader != undefined) {
        if (["*/*", "application/json"].indexOf(acceptHeader.toString()) < 0) {
            throw new NotAcceptableError();
        }
    }
    next();
};