import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import Airport from "../entities/Airport";
import AirportRoute from "../entities/AirportRoute";

const db: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "flight",
    password: "secret_password",
    database: "flights",
    entities: [
        Airport,
        AirportRoute
    ],
    synchronize: true,
    logging: false
};

export default db;