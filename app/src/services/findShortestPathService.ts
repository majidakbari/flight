import getFlightRepository from "../repositories/getFlightRepository";

const findShortestPathService = async () => {
    const flightRepository = getFlightRepository;
    return flightRepository.shortestPath();
};

export default findShortestPathService;