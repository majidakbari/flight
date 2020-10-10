import { Repository } from "typeorm";
import Airport from "../entities/Airport";
import getDbConnection from "../utils/getDbConnection";

const getAirportRepository: () => Promise<Repository<Airport>> = async () => {
    return (await getDbConnection()).getRepository(Airport);
};

export default getAirportRepository;