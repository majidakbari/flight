import Airport from "../entities/Airport";
import Flight from "../interfaces/flight";
import getFlightRepository from "../repositories/getFlightRepository";

const findShortestPathWithMostKEdgesService: (src: Airport, tgt: Airport) => Promise<Flight[]> =
    async (source: Airport, target: Airport) => {
        const flightRepository = getFlightRepository;
        return await flightRepository.shortestPathWithMostKEdges(source.id, target.id);
    };

export default findShortestPathWithMostKEdgesService;