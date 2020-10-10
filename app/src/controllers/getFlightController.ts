import { RequestHandler } from "express";
import getShortestPathAction from "../actions/getShortestPathAction";

const getFlightController: RequestHandler = async (req, res) => {
    const query = req.query;
    return res.json(await getShortestPathAction(query.src as string, query.dst as string))
};

export default getFlightController;

