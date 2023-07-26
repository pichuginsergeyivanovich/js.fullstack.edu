import{Response, Request, NextFunction} from 'express'
import userService from '../servces/user.service';
class UsersController{

    async getAllUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await userService.getAllUsers();
            res.send(users)
        }
        catch(e){
            next(e);
        }
    }

}

export default new UsersController();