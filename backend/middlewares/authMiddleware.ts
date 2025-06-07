import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebaseAdmin";
import { decode } from "punycode";

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') // Handle newlines in private key
        })
    })
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Unauthorized: Missing token"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).uid = decodedToken.uid; // Attach user ID to request object
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Missing token"});
    }
}