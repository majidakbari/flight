import createIndex from "./createIndex";
import seedAirports from "./seedAirports";
import seedAirportRoutes from "./seedAirportRoutes";
import seedImaginaryAirportRoutes from "./seedImaginaryAirportRoutes";

const seedDb = async() => {
  await seedAirports();
  await seedAirportRoutes();
  await seedImaginaryAirportRoutes();
  await createIndex();
};


seedDb().then(() => console.log("All done!"));

