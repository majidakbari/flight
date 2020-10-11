import "reflect-metadata";
import Airport from "../entities/Airport";
import { ConnectionOptions } from "typeorm";
import AirportRoute from "../entities/AirportRoute";
import ImaginaryAirportRoute from "../entities/ImaginaryAirportRoute";

const db: ConnectionOptions = {
    type: "postgres",
    host: "flight-db",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Airport,
        AirportRoute,
        ImaginaryAirportRoute
    ],
    synchronize: true,
    logging: false
};

export default db;