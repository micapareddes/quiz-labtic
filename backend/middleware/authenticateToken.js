import ServidorError from "../ServidorError.js"
import { TOKEN_ERROR } from "../constants/errorCodes.js"
import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) throw new ServidorError(TOKEN_ERROR.NOT_PROVIDED)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        req.userId = payload.id 
        next()
    })
}