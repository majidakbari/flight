import { createConnection } from "typeorm";
import { db } from "../config/db";

export const dbConnection = createConnection(db).catch(err => {throw err});