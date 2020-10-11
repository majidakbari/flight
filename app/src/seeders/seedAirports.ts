import {airports} from "./data/airports"
import Airport from "../entities/Airport";
import getAirportRepository from "../repositories/getAirportRepository";

const seedAirports = async (): Promise<void> => {
    const airportRepository = await getAirportRepository();
    for (const value of airports) {
        const airport = await airportRepository.findOne({code: value.code});
        if (airport != undefined) continue;
        await airportRepository.createQueryBuilder()
            .insert()
            .into(Airport)
            .values({
                code: value.code,
                icao: value.icao,
                name: value.name,
                city: value.city,
                country: value.country,
                geom: () => {
                    return `ST_SetSRID(ST_Point(${value.lon}, ${value.lat}), 4326)`
                }
            }).execute();

        console.log(`Seeding airport: ${value.name}...`)
    }
};

export default seedAirports;
