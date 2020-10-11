import Airport from "../entities/Airport";
import Flight from "../interfaces/flight";
import flightRepository from "../repositories/getFlightRepository";

const findShortestPathService = async (source: Airport, target: Airport): Promise<Flight[]> => {
        return await flightRepository.shortestPath(source.id, target.id);
    };

export default findShortestPathService;