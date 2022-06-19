module.exports = class APIError extends Error {
    status;
    errors;

    
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;

    }


    static AuthError() {
        return new APIError(401, "User not authorized");
    }


    static BadRequest(message, errors = []) {
        return new APIError(400, message, errors);
    }
}