import jwt from "jsonwebtoken";

export interface JwtPayload {
    id: string;
    role: string;
}

export function generateAccessToken(payload: JwtPayload) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
    );
}

export function verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as JwtPayload;
}