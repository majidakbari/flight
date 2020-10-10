import { RequestHandler } from "express";
import getShortestPathWithMostKEdges from "../actions/getShortestPathWithMostKEdgesAction";

const getFlightWithMostKLayoversController: RequestHandler = async (req, res) => {
    const query = req.query;
    return res.json(await getShortestPathWithMostKEdges(query.src as string, query.dst as string))
};

export default getFlightWithMostKLayoversController;

