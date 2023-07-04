import{Response, Request, NextFunction} from 'express'
import authService from '../servces/auth.service';
class AuthController{
    async register(req: Request, res: Response, next: NextFunction){
        try{
            await authService.register(req.body);
            return res.status(201).json({message:"User registered"});
        }
        catch(e){
            next(e);
        }
    }
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const token = await authService.login(req.body);
            res.set("Authorization",`Bearer ${token}`)
            res.send("Success")
        }
        catch(e){
            next(e);
        }
    }
 

}

export default new AuthController();