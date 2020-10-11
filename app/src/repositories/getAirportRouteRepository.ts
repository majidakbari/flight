import { Repository } from "typeorm";
import getDbConnection from "../utils/getDbConnection";
import AirportRoute from "../entities/AirportRoute";

const getAirportRouteRepository = async (): Promise<Repository<AirportRoute>> => {
    return (await getDbConnection()).getRepository(AirportRoute);
};

export default getAirportRouteRepository;