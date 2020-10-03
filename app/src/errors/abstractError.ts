abstract class AbstractError  extends Error{
    protected constructor(public statusCode : number, message: string) {
        super(message);
    }
}

export default AbstractError;