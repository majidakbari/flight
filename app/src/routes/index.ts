import { Router } from "express";
import flightRouter from "./flight";

const router = Router();

router.use("/api", flightRouter);

export default router;