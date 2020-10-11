import { Router } from 'express';
import validationHandler from "../utils/validationHandler";
import methodNotAllowed from "../utils/methodNotAllowedHandler";
import getFlightController from "../controllers/getFlightController";
import flightSearchValidationRules from "../validations/flightSearchValidationRules";
import getFlightWithMostKLayoversController from "../controllers/getFlightWithMostKLayoversController";

const router = Router();

router.route('/v1/flight/search').get(flightSearchValidationRules, validationHandler, getFlightController)
    .all(methodNotAllowed);

router.route('/v2/flight/search').get(flightSearchValidationRules, validationHandler, getFlightWithMostKLayoversController)
    .all(methodNotAllowed);


export default router;