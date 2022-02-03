import { Response } from "express";

export class ErrorHandler extends Error {
    statusCode;

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}     

export const handleError = (err: ErrorHandler, res: Response) => {

    const {statusCode, message} = err;

    return res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
};

module.exports = {
    handleError, ErrorHandler
}