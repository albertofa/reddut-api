import { verify } from "crypto";

import jwt from 'jsonwebtoken'

export function verifyToken(token: string){
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            throw {name: 'invalid_token', message: `The providade token is not valid.`} as Error
        } else {
            return decoded
        }
    });
}