import getDbConnection from "../utils/getDbConnection";
import ImaginaryAirportRoute from "../entities/ImaginaryAirportRoute";
import getAirportRepository from "../repositories/getAirportRepository";
import getImaginaryAirportRouteRepository from "../repositories/getImaginaryAirportRouteRepository";

const seedImaginaryAirportRoutes = async (): Promise<void> => {
    const chunkSize = 10;
    const dbConnection = await getDbConnection();
    const airportRepository = await getAirportRepository();
    const imaginaryAirportRouteRepository = await getImaginaryAirportRouteRepository();
    let remaining = await airportRepository.count();
    let iteration = 1;

    while (remaining > 0) {
        const airports = await airportRepository.find({take: chunkSize, skip: (iteration - 1) * chunkSize});
        for (const airport of airports) {
            const nearByAirports = await dbConnection.query(
                "select * from airport a where ST_Distance(a.geom::geography, " +
                `ST_Point(${airport.geom.lon}, ${airport.geom.lat})::geography) < 100000` +
                "AND a.id != $1", [airport.id]
            );
            for (const nearbyAirport of nearByAirports) {
                const imaginaryAirportRoute = new ImaginaryAirportRoute();
                imaginaryAirportRoute.source = airport.id;
                imaginaryAirportRoute.target = nearbyAirport.id;
                await imaginaryAirportRouteRepository.save(imaginaryAirportRoute);
                console.log(`Seeding nearby airport routes; ${airport.code} -> ${nearbyAirport.code}...`)
            }
        }
        remaining = remaining - airports.length;
        iteration++;
    }
};

export default seedImaginaryAirportRoutes;