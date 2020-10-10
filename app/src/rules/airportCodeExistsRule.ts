import getAirportRepository from "../repositories/getAirportRepository";

const airportCodeExistsRule = async (value: any) => {
    const airportRepository = await getAirportRepository();
    const airport = await airportRepository.findOne({code: value});
    if (airport == undefined) {
        return Promise.reject("Invalid airport code.")
    }
};

export default airportCodeExistsRule;