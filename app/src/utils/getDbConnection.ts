import db from "../config/db";
import {Connection, createConnection} from "typeorm";

let connection: Connection;

const connectToDb = async (): Promise<Connection> => {
    connection = await createConnection(db);
    return connection;
};

const getDbConnection = async (): Promise<Connection>  => {
    if (connection != undefined) {
        return connection;
    }
    return await connectToDb();
};

export default getDbConnection;