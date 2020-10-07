import { RequestHandler } from "express";
import { getAirportRepository } from "../repositories/getAirportRepository";

export const search: RequestHandler = async (req, res) => {
    const airportRepo = await getAirportRepository();
    const airport = await airportRepo.findOne(1);

    return res.json({
        airport: airport,
    })
};