import {Router} from 'express'
import passport from 'passport'
import projectController from '../../../controller/project.controller';

const router = Router()
router.use(passport.authenticate("jwt",{session:false}))
router.get('/', projectController.getAllProjects);
router.post('/create', projectController.createProject);



export default router;