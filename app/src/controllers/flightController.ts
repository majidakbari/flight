import { RequestHandler } from "express";
import { airportRepository } from "../repositories/airportRepository";

export const search: RequestHandler = async (req, res) => {
    const airportRepo = await airportRepository();
    const airport = await airportRepo.findOne(1);

    return res.json({
        airport: airport
    })
};