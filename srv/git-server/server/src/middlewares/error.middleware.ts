import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware=async(err:string, req:Request, res:Response, next:NextFunction)=>
{
    console.log(`[ERR] ${err}`)
  
    res.status(500).json({mesage:"Internal Error"});
}