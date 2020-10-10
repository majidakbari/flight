import flightRepository from "../repositories/getFlightRepository";
import Airport from "../entities/Airport";
import Flight from "../interfaces/flight";

const findShortestPathService: (src: Airport, tgt: Airport) => Promise<Flight[]> =
    async (source: Airport, target: Airport) => {
        return await flightRepository.shortestPath(source.id, target.id);
    };

export default findShortestPathService;