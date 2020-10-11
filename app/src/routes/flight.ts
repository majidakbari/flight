import { Router } from 'express';
import validationHandler from "../utils/validationHandler";
import methodNotAllowed from "../utils/methodNotAllowedHandler";
import getFlightControllerV1 from "../controllers/v1/getFlightController";
import getFlightControllerV2 from "../controllers/v2/getFlightController";
import getFlightControllerV3 from "../controllers/v3/getFlightController";
import flightSearchValidationRules from "../validations/flightSearchValidationRules";

const router = Router();

router.route('/v1/flight/search').get(flightSearchValidationRules, validationHandler, getFlightControllerV1)
    .all(methodNotAllowed);

router.route('/v2/flight/search').get(flightSearchValidationRules, validationHandler, getFlightControllerV2)
    .all(methodNotAllowed);

router.route('/v3/flight/search').get(flightSearchValidationRules, validationHandler, getFlightControllerV3)
    .all(methodNotAllowed);

export default router;