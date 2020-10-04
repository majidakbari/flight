// import { airports } from "./data/airports"
// import { Airport } from "../entities/Airport";
// import { dbConnection } from "../utils/dbConnection";
//
// dbConnection.then(connection => {
//     const airportRepository = connection.getRepository(Airport);
//
//     airports.forEach(function (value) {
//         const airport = new Airport();
//         airport.code = value.code;
//         airport.icao = value.icao;
//         airport.geom = `(${value.lat}, ${value.lon})`;
//         airport.name = value.name;
//         airport.city = value.city;
//         airport.country = value.country;
//
//         airportRepository.save(airport);
//     });
// }).then(() => console.log("Seeding database..."));
