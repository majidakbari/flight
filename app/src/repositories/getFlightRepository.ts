import Flight from "../interfaces/flight";
import getDbConnection from "../utils/getDbConnection";

class flightRepository {
    //Don't be afraid of SQL injection! These arguments have been checked in upper layers
    public static async shortestPath(sourceId: number, targetId: number): Promise<Flight[]> {
        const connection = await getDbConnection();
        return await connection.query("SELECT p.seq -1 as id, p.node as airport_id, c.code, " +
            "c.name, c.city, c.country FROM " +
            `pgr_dijkstra('SELECT id, source, target, distance AS cost FROM airport_route', ${sourceId}, ${targetId}) AS P ` +
            "LEFT JOIN airport_route AS r ON p.edge = r.id " +
            "LEFT JOIN airport AS c ON p.node = c.id " +
            "ORDER BY p.seq;");
    }

    public static async shortestPathWithMostKEdges(sourceId: number, targetId: number): Promise<Flight[]> {
        const connection = await getDbConnection();
        return await connection.query("SELECT * from shortest_path($1, $2)", [sourceId, targetId]);
    }
}

export default flightRepository;