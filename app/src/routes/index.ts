import { Router } from "express";
import flightRouter from "./flight";

const router = Router();

router.use("/flight", flightRouter);

export default router;