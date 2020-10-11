import Flight from "../interfaces/flight";
import configurations from "../config/app";
import ModelNotFoundError from "../errors/modelNotFoundError";
import findAirportByCodeService from "../services/findAirportByCodeService";
import findShortestPathAugmentedWithMostKEdgesService from "../services/findShortestPathAugmentedWithMostKEdgesService";

const getShortestPathAugmentedWithMostKEdgesAction = async (src: string, dst: string): Promise<Flight[]> => {
        const source = await findAirportByCodeService(src);
        const target = await findAirportByCodeService(dst);
        if (source && target) {
            return await findShortestPathAugmentedWithMostKEdgesService(source, target, configurations.maxNodes);
        }
        throw new ModelNotFoundError();
    };

export default getShortestPathAugmentedWithMostKEdgesAction;