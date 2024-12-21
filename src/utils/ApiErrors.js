class ApiErrors extends Error {
    constructor(statusCode = 500, message = "Something went wrong", data = null) {
        super(message) 
        this.name = this.constructor.name; 
        this.status = statusCode >= 500 ? 'fail' : 'error'; 
        this.statusCode = statusCode;
        this.data = data || null;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiErrors;
