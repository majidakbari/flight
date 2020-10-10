import seedAirports from "./seedAirports";
import seedAirportRoutes from "./seedAirportRoutes";
import getDbConnection from "../utils/getDbConnection";

const seedDb = async() => {
  await seedAirports();
  await seedAirportRoutes();
  const connection = await getDbConnection();
  await connection.query("select pgr_createVerticesTable('airport_route','geom','source','target');");
};


seedDb().then(res => console.log("All done!"));

