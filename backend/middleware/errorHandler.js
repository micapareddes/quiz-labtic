import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"

export function errorHandler(error, req, res, next) {
    if (error instanceof mongoose.Error.ValidationError){
        console.log('VALIDATION_ERROR', error)
        return res.status(400).send({
            error: true,
            type: "ValidationError",
            message: error.message
        })
    }

    if (error.code === 11000) {
        console.log('DUPLICATE_KEY_ERROR', error);
        return res.status(400).json({
            error: true,
            type: "DuplicateKeyError",
            message: error.message,
        });
    }

    if (error instanceof ServidorError) {
        console.log('SERVIDOR_ERROR', error);
        return res.status(error.statusCode).json({
            error: true,
            code: error.errorCode,
            message: error.message,
        })
    }
    console.log('INTERN_ERROR', error)
    return res.status(500).send("Algo deu errado...")
}