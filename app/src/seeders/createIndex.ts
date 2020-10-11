import getDbConnection from "../utils/getDbConnection";

const createIndex = async (): Promise<void> => {
    const connection = await getDbConnection();
    await connection.query("select pgr_createVerticesTable('airport_route','geom','source','target');");
    console.log("Indices were created on db...")
};

export default createIndex;