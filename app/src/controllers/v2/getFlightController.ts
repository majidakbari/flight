import { RequestHandler } from "express";
import getShortestPathWithMostKEdgesAction from "../../actions/getShortestPathWithMostKEdgesAction";

const getFlightController: RequestHandler = async (req, res) => {
    const query = req.query;
    return res.json(await getShortestPathWithMostKEdgesAction(query.src as string, query.dst as string))
};

export default getFlightController;

