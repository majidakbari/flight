import {RequestHandler} from "express";

export const search : RequestHandler = (req, res) => {
    return res.json({
        data : "It works!"
    })
};