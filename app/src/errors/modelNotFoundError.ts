import AbstractError from "./abstractError";

class ModelNotFoundError extends AbstractError{
    constructor() {
       super(404, "Model not found.");
    }

}

export default ModelNotFoundError;