import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";
const JWT_SECRET="SECRET";

const prisma = new PrismaClient();
export const signup = async (req: Request, res: Response) =>{
    const {email, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {email, passwordHash}
    });
    res.status(201).json({user});
};

export const login = async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where: {email}});
    if(!user || !(await bcrypt.compare(password, user.passwordHash))){
        return res.status(401).json({ message: 'Invalid Credentials'});
    }

    const token = Jwt.sign({userId: user.id}, JWT_SECRET!,{expiresIn: '1h'});
    res.json({token});
};