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
            const result = await authService.login(req.body);
            if(!result)
                throw new Error('No such user');
            res.set("Authorization",`Bearer ${result.token}`)
            console.log("token=",result.token)
            console.log("user=",result.user)
            res.status(201).json(result)

        }
        catch(e){
            next(e);
        }
    }
 

}

export default new AuthController();