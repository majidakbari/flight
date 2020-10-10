import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import UnprocessableEntityError from "../errors/unprocessableEntityError";

const validationHandler: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new UnprocessableEntityError(errors.array());
    }
    next();
};

export default validationHandler;