import {RequestHandler} from "express";
import RouteNotFoundError from "../errors/routeNotFoundError";

export const routeHandler : RequestHandler = (req, res, next) => {
    if (!req.route)
        throw new RouteNotFoundError();
    next();
};