import { query } from "express-validator"
import airportCodeExistsRule from "../rules/airportCodeExistsRule";

const flightSearchValidationRules = [
    query('src').exists().custom(airportCodeExistsRule),
    query('dst').exists().custom(airportCodeExistsRule)
];

export default flightSearchValidationRules;