import { Airport } from "../entities/Airport";
import { dbConnection } from "../utils/dbConnection";

export const airportRepository = async () => {
    return (await dbConnection()).getRepository(Airport);
};