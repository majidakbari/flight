import AbstractError from "./abstractError";

class RouteNotFoundError extends AbstractError{
    constructor() {
       super(404, "Route not found.");
    }

}

export default RouteNotFoundError;