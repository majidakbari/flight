import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Airport } from "../entities/Airport";

export const db: ConnectionOptions = {
    type: "postgres",
    host: "flight-db",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Airport
    ],
    synchronize: true,
    logging: false
};