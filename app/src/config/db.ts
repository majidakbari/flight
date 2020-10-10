import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import Airport from "../entities/Airport";
import AirportRoute from "../entities/AirportRoute";

const db: ConnectionOptions = {
    type: "postgres",
    host: "flight-db",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Airport,
        AirportRoute
    ],
    synchronize: true,
    logging: false
};

export default db;