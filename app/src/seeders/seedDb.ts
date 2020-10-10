import seedAirports from "./seedAirports";
import seedAirportRoutes from "./seedAirportRoutes";
import createIndex from "./createIndex";

const seedDb = async() => {
  await seedAirports();
  await seedAirportRoutes();
  await createIndex();
};


seedDb().then(res => console.log("All done!"));

