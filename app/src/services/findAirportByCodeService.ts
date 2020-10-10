import Airport from "../entities/Airport";
import getAirportRepository from "../repositories/getAirportRepository";

const findAirportByCodeService: (code: string) => Promise<Airport | undefined> = async (code: string) => {
    const airportRepository = await getAirportRepository();
    return await airportRepository.findOne({code: code});
};

export default findAirportByCodeService;