import ModelNotFoundError from "../errors/modelNotFoundError";
import findAirportByCodeService from "../services/findAirportByCodeService";
import findShortestPathService from "../services/findShortestPathService";
import Flight from "../interfaces/flight";

const getShortestPathAction = async (src: string, dst: string): Promise<Flight[]> => {
    const source = await findAirportByCodeService(src);
    const target = await findAirportByCodeService(dst);
    if (source && target) {
        return await findShortestPathService(source, target);
    }
    throw new ModelNotFoundError();
};

export default getShortestPathAction;