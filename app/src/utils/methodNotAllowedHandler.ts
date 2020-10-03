import MethodNotAllowedError from "../errors/methodNotAllowedError";

const methodNotAllowed = () => {
    throw new MethodNotAllowedError();
};

export default methodNotAllowed;