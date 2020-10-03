import { Router } from "express";
import cors from "cors";

const router = Router();

router.use(
    cors({
        origin: "*",
        methods: "*",
        allowedHeaders: "*"
    })
);

export default router;