import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Airport } from "../entities/Airport";

export const databaseConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "flight",
    password: "secret_password",
    database: "flights",
    entities: [
        Airport
    ],
    synchronize: true,
    logging: false
};