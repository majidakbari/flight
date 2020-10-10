import AbstractError from "./abstractError";

class MethodNotAllowedError extends AbstractError{
    constructor() {
       super(405, "Method not allowed.");
    }
}

export default MethodNotAllowedError;