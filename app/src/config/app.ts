import Configuration from "../interfaces/configuration";

const configurations: Configuration = {
    maxNodes: process.env.MAX_NODES != undefined ? parseInt(process.env.MAX_NODES) : 5
};

export default configurations;