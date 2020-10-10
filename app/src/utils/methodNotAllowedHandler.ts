import MethodNotAllowedError from "../errors/methodNotAllowedError";

const methodNotAllowed: () => void = () => {
    throw new MethodNotAllowedError();
};

export default methodNotAllowed;