import Airport from "../entities/Airport";
import getAirportRepository from "../repositories/getAirportRepository";

const findAirportByCodeService = async (code: string): Promise<Airport | undefined> => {
    const airportRepository = await getAirportRepository();
    return await airportRepository.findOne({code: code});
};

export default findAirportByCodeService;