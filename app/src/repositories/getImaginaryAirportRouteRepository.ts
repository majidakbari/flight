import { Repository } from "typeorm";
import getDbConnection from "../utils/getDbConnection";
import ImaginaryAirportRoute from "../entities/ImaginaryAirportRoute";

const getImaginaryAirportRouteRepository = async (): Promise<Repository<ImaginaryAirportRoute>> => {
    return (await getDbConnection()).getRepository(ImaginaryAirportRoute);
};

export default getImaginaryAirportRouteRepository;