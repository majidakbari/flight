import { EntityManager, getCustomRepository } from "typeorm";

class flightRepository {
    constructor(private manager: EntityManager) {
    }

    shortestPath() {

    }
}

export default getCustomRepository(flightRepository);