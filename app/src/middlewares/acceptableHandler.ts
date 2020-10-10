import {RequestHandler} from "express";
import NotAcceptableError from "../errors/notAcceptableError";

const acceptableHandler: RequestHandler = (req, res, next) => {
    const acceptHeader = req.header("accept");
    if (acceptHeader != undefined) {
        if (["*/*", "application/json"].indexOf(acceptHeader.toString()) < 0) {
            throw new NotAcceptableError();
        }
    }
    next();
};

export default acceptableHandler;