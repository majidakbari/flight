import findAirportByCodeService from "../services/findAirportByCodeService";

const getShortestPathAction = async (src: string, dst: string) => {
    const source = await findAirportByCodeService(src);
    const destination = await findAirportByCodeService(dst);
};

export default getShortestPathAction;