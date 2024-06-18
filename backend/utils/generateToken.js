import jwt from "jsonwebtoken"

export function generateAccessToken(user) {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}