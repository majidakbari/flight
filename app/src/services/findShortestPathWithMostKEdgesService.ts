import Airport from "../entities/Airport";
import Flight from "../interfaces/flight";
import flightRepository from "../repositories/getFlightRepository";

const findShortestPathWithMostKEdgesService: (src: Airport, tgt: Airport) => Promise<Flight[]> =
    async (source: Airport, target: Airport) => {
        return await flightRepository.shortestPathWithMostKEdges(source.id, target.id);
    };

export default findShortestPathWithMostKEdgesService;