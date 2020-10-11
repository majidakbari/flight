import { RequestHandler } from "express";
import getShortestPathAugmentedWithMostKEdgesAction from "../../actions/getShortestPathAugmentedWithMostKEdgesAction";

const getFlightController: RequestHandler = async (req, res) => {
    const query = req.query;
    return res.json(await getShortestPathAugmentedWithMostKEdgesAction(query.src as string, query.dst as string))
};

export default getFlightController;

