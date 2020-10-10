import { Router } from 'express';
import search from '../controllers/flightController';
import methodNotAllowed from "../utils/methodNotAllowedHandler";
import validationHandler from "../utils/validationHandler";
import flightSearchValidationRules from "../validations/flightSearchValidationRules";

const router = Router();

router.route('/search').get(flightSearchValidationRules, validationHandler, search).all(methodNotAllowed);


export default router;