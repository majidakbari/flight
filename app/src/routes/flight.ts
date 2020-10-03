import { Router } from 'express';
import { search } from '../controllers/flightController';
import methodNotAllowed from "../utils/methodNotAllowedHandler";

const router = Router();

router.route('/search').get(search).all(methodNotAllowed);

export default router;