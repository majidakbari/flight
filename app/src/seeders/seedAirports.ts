import { airports } from "./data/airports"
import { Airport } from "../entities/Airport";
import { getDbConnection } from "../utils/getDbConnection";

export const seedAirports = async () => {
    const dbConnection = await getDbConnection();
    for (const value of airports) {
        await dbConnection.createQueryBuilder()
            .insert()
            .into(Airport)
            .values({
                code: value.code,
                icao: value.icao,
                name: value.name,
                city: value.city,
                country: value.country,
                geom: () => {
                    return `ST_SetSRID(ST_Point(${value.lat}, ${value.lon}), 4326)`
                }
            }).execute();
        console.log(`Seeding airport: ${value.name}...`)
    }
};

seedAirports().then(res => console.log("All the airports were inserted into db."));