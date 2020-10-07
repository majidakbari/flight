import { Repository } from "typeorm";
import { getDbConnection } from "../utils/getDbConnection";
import {AirportRoute} from "../entities/AirportRoute";

export const getAirportRouteRepository: () => Promise<Repository<AirportRoute>> = async () => {
    return (await getDbConnection()).getRepository(AirportRoute);
};