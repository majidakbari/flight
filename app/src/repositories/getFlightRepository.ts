import {Connection} from "typeorm";
import getDbConnection from "../utils/getDbConnection";
import Flight from "../interfaces/flight";

class flightRepository {
    private connection: Connection;

    constructor() {
        getDbConnection().then(c => this.connection = c);
    }

    async shortestPath(sourceId: number, targetId: number): Promise<Flight[]> {
        return await this.connection.query("SELECT p.seq -1 as id, p.node as airport_id, c.code, " +
            "c.name, c.city, c.country FROM " +
            `pgr_dijkstra('SELECT id, source, target, distance AS cost FROM airport_route', ${sourceId}, ${targetId}) AS P ` +
            "LEFT JOIN airport_route AS r ON p.edge = r.id " +
            "LEFT JOIN airport AS c ON p.node = c.id " +
            "ORDER BY p.seq;");
    }

    async shortestPathWithMostKEdges(sourceId: number, targetId: number): Promise<Flight[]> {
        return await this.connection.query("SELECT * from shortest_path($1, $2)", [sourceId, targetId]);
    }
}

const getFlightRepository: flightRepository = new flightRepository();

export default getFlightRepository;