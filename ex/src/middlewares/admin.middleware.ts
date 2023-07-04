import { NextFunction, Request, Response } from "express";
import User, { UserRoles } from "../models/user.model";

interface IUser{
    userId: number;    
}

export const AdminMiddleware=async(req:Request, res:Response, next:NextFunction)=>{
    const user = req.user as IUser;

    const userFromDb=await User.findAll({
        where:{
            id: user.userId
        }

    });

    if (userFromDb[0].role==UserRoles.ADMIN){
        next();
    }
    else{
        res.status(400).json({mesage:"Permission denied."});
    }


}