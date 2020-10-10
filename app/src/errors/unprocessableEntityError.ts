import AbstractError from "./abstractError";

class UnprocessableEntityError extends AbstractError{
    constructor(details: object[]) {
       super(422, "Unprocessable Entity.", details);
    }
}

export default UnprocessableEntityError;