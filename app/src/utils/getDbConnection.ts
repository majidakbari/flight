import db from "../config/db";
import { Connection, createConnection } from "typeorm";

let connection: Connection;

const connectToDb: () => Promise<Connection> = async () => {
    try {
        connection = await createConnection(db);
        return connection;
    } catch (e) {
        throw e;
    }
};

const getDbConnection: () => Promise<Connection> = async () => {
    if (connection != undefined) {
        return connection;
    }
    return connectToDb();
};

export default getDbConnection;