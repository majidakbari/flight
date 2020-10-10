import { Repository } from "typeorm";
import getDbConnection from "../utils/getDbConnection";
import AirportRoute from "../entities/AirportRoute";

const getAirportRouteRepository: () => Promise<Repository<AirportRoute>> = async () => {
    return (await getDbConnection()).getRepository(AirportRoute);
};

export default getAirportRouteRepository;