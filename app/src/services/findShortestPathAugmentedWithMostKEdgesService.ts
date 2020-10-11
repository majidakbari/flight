import Airport from "../entities/Airport";
import Flight from "../interfaces/flight";
import flightRepository from "../repositories/getFlightRepository";

const findShortestPathAugmentedWithMostKEdgesService = async (source: Airport, target: Airport, maxNodes: number): Promise<Flight[]> => {
    return await flightRepository.shortestPathAugmentedWithMostKEdges(source.id, target.id, maxNodes);
};

export default findShortestPathAugmentedWithMostKEdgesService;