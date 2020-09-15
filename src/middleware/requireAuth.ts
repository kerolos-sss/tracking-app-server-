import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

const User = mongoose.model('User');


const requireAuth =  (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in." })
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, MY_SECRET_KEY, async (error, payload) => {
        if (error){
            return res.status(401).send({ error: "You must be logged in." })  
        }

        const {userId} = payload as any;
        const user = await User.findById(userId);
        
        req.user = user;
        next();
    })
}

export default requireAuth;