import { createConnection } from "typeorm";
import { databaseConfig } from "../config/databaseConfig";
import { airports } from "./data/airports"
import { Airport } from "../entities/Airport";

createConnection(databaseConfig).then(connection => {
    const airportRepository = connection.getRepository(Airport);

    airports.forEach(function (value) {
        const airport = new Airport();
        airport.code = value.code;
        airport.icao = value.icao;
        airport.lat = parseFloat(value.lat);
        airport.lon = parseFloat(value.lon);
        airport.name = value.name;
        airport.city = value.city;
        airport.country = value.country;

        airportRepository.save(airport)
            .then(() => console.log("New record has been saved successfully!"))
            .catch(err => {
                throw err
            });
    });


}).then(err => console.log(err));
