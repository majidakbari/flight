import { Repository } from "typeorm";
import Airport from "../entities/Airport";
import getDbConnection from "../utils/getDbConnection";

const getAirportRepository = async (): Promise<Repository<Airport>> => {
    return (await getDbConnection()).getRepository(Airport);
};

export default getAirportRepository;