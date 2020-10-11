import Airport from "../entities/Airport";
import Flight from "../interfaces/flight";
import flightRepository from "../repositories/getFlightRepository";

const findShortestPathWithMostKEdgesService = async (source: Airport, target: Airport, maxNodes: number): Promise<Flight[]> => {
    return await flightRepository.shortestPathWithMostKEdges(source.id, target.id, maxNodes);
};

export default findShortestPathWithMostKEdgesService;