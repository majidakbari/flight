import {ValidationError} from "express-validator";

interface Error {
    error: string;
    message: string;
    details?: ValidationError[];
}

export default Error;