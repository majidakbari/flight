import {ValidationError} from "express-validator";

abstract class AbstractError extends Error {
    protected constructor(public statusCode: number, message: string, public details: ValidationError[] = []) {
        super(message);
    }
}

export default AbstractError;