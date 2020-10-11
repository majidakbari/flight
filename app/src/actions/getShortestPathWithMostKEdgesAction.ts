import Flight from "../interfaces/flight";
import configurations from "../config/app";
import ModelNotFoundError from "../errors/modelNotFoundError";
import findAirportByCodeService from "../services/findAirportByCodeService";
import findShortestPathWithMostKEdgesService from "../services/findShortestPathWithMostKEdgesService";

const getShortestPathWithMostKEdges = async (src: string, dst: string): Promise<Flight[]> => {
        const source = await findAirportByCodeService(src);
        const target = await findAirportByCodeService(dst);
        if (source && target) {
            return await findShortestPathWithMostKEdgesService(source, target, configurations.maxNodes);
        }
        throw new ModelNotFoundError();
    };

export default getShortestPathWithMostKEdges;