import { airportRoutes } from "./data/airportRoutes";
import {AirportRoute} from "../entities/AirportRoute";
import {getAirportRepository} from "../repositories/getAirportRepository";
import {getDbConnection} from "../utils/getDbConnection";

export const seedAirportRoutes = async () => {
    const airportRepository = await getAirportRepository();
    const connection = (await getDbConnection());

    for (const route of airportRoutes) {
        let source = await airportRepository.findOne({code: route.s});
        let target = await airportRepository.findOne({code: route.d});
        if (source == undefined || target == undefined) {
            continue;
        }
        await connection.createQueryBuilder()
            .insert()
            .into(AirportRoute)
            .values({
                source: source.id,
                target: target.id,
                distance: () => {
                    return `ST_Distance(ST_SetSRID(ST_Point(${source?.geom.x}, ${source?.geom.y}), 4326)::GEOGRAPHY,` +
                    `ST_SetSRID(ST_Point(${target?.geom.x}, ${target?.geom.y}), 4326)::GEOGRAPHY)`;
                },
                geom: () => {
                    return `ST_MakeLine(ST_SetSRID(ST_Point(${source?.geom.x}, ${source?.geom.y}), 4326),` +
                        `ST_SetSRID(ST_Point(${target?.geom.x}, ${target?.geom.y}), 4326))::GEOMETRY(LineString,4326)`;
                },
            }).execute();

        console.log(`Seeding route from ${route.s} to ${route.d}...`)
    }
};

seedAirportRoutes().then(res => console.log("All the routes were inserted into db."));
//
// SELECT
// p.seq, p.node, p.cost, r.geom as edge_geom, c.name
// FROM
// pgr_dijkstra(
//     'SELECT id, source, target, distance AS cost FROM airport_route',
//     (SELECT id FROM airport WHERE code = 'IKA'),
// (SELECT id FROM airport WHERE code = 'LAS'),
// TRUE
// ) AS p
// LEFT JOIN airport_route AS r ON p.edge = r.id
// LEFT JOIN airport AS c ON p.node = c.id
//
// ORDER BY
// p.seq;