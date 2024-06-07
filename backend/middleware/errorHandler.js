import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"

export function errorHandler(error, req, res, next) {
    if (error instanceof mongoose.Error.ValidationError){
        console.log('VALIDATION_ERROR', error)
        return res.status(400).send({
            type: "ValidationError",
            details: error.message
        })
    }

    if (error instanceof ServidorError) {
        console.log('SERVIDOR_ERROR', error);
        return res.status(error.statusCode).json({
            errorCode: error.errorCode,
        })
    }
    console.log('INTERN_ERROR', error)
    return res.status(500).send("Algo deu errado...")
}