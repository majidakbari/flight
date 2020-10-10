import AbstractError from "./abstractError";

class NotAcceptableError extends AbstractError{
    constructor() {
       super(406, "This application only returns json responses.");
    }
}

export default NotAcceptableError;