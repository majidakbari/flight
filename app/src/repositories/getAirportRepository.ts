import { Repository } from "typeorm";
import { Airport } from "../entities/Airport";
import { getDbConnection } from "../utils/getDbConnection";

export const getAirportRepository: () => Promise<Repository<Airport>> = async () => {
    return (await getDbConnection()).getRepository(Airport);
};