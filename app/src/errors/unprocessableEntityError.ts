import AbstractError from "./abstractError";
import {ValidationError } from "express-validator";

class UnprocessableEntityError extends AbstractError{
    constructor(details: ValidationError[]) {
       super(422, "Unprocessable Entity.", details);
    }
}

export default UnprocessableEntityError;