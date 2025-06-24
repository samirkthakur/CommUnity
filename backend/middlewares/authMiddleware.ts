import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebaseAdmin";
import { decode } from "punycode";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Unauthorized: Missing token"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).uid = decodedToken.uid;
        next();
    } catch (error) {
        console.error("Token verification failed: ", error);;
        return res.status(401).json({ message: "Unauthorized: Invalid token"});
    }
}