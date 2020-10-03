import express from "express";
import { errorHandler } from "../middlewares/errorHandler";
import { routeHandler } from "../middlewares/routeHandler";
import { acceptableHandler } from "../middlewares/acceptableHandler";
import corsHandler from "../middlewares/corsHandler";
import appRouter from "../routes/index";
import helmet from "helmet";
import "reflect-metadata"

const app = express();

app.use(helmet());
app.use(corsHandler);
app.use(acceptableHandler);
app.use(appRouter);
app.use(routeHandler);
app.use(errorHandler);
app.listen(3000);