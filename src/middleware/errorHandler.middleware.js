import ApiErrors from "../utils/ApiErrors.js";

const errorHandler = (err, _, res, next) => {
    if (err instanceof ApiErrors) {
        return res.status(err.statusCode).json({
            statusCode : err.statusCode,
            status: err.status,
            message: err.message,
            data: err.data, 
        });
    }

    // Handle unexpected errors (non-ApiErrors)
    return res.status(500).json({
        statusCode : err.statusCode || 500,
        status: err.status || "fail",
        message: err.message || 'Internal Server Error',
        data: null,
    });
};

export default errorHandler;
