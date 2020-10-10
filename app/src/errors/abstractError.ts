abstract class AbstractError  extends Error {
    protected constructor(public statusCode : number, message: string, public details : object[] = []) {
        super(message);
    }
}

export default AbstractError;