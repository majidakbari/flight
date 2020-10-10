import { airportRoutes } from "./data/airportRoutes";
import AirportRoute from "../entities/AirportRoute";
import getAirportRepository from "../repositories/getAirportRepository";
import getAirportRouteRepository from "../repositories/getAirportRouteRepository";

const seedAirportRoutes = async () => {
    const airportRepository = await getAirportRepository();
    const airportRouteRepository = await getAirportRouteRepository();

    for (const route of airportRoutes) {
        let source = await airportRepository.findOne({code: route.s});
        let target = await airportRepository.findOne({code: route.d});
        if (source == undefined || target == undefined) {
            continue;
        }
        let existingRoute = await airportRouteRepository.findOne({source: source.id, target: target.id});
        if (existingRoute != undefined){
            continue;
        }
        await airportRouteRepository.createQueryBuilder()
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

export default seedAirportRoutes;