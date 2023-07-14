import {NextFunction, Router} from 'express'
import passport from 'passport'
import repositoryController from '../../../controller/repository.controller';

const router = Router()
router.use(passport.authenticate("jwt",{session:false}))

//router.use('/:project/repositories/create', repositoryController.createRepository);
// router.post('/create', (project:string,req:Request,res:Response,next:NextFunction)=>{
//     repositoryController.createRepository(project, req,res,next);
// });


export default router;