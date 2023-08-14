import {Router} from 'express'
import passport from 'passport'
import projectController from '../../../controller/project.controller';
import settingsController from '../../../controller/settings.controller';

const router = Router()
router.use(passport.authenticate("jwt",{session:false}))
router.get('/', projectController.getAllProjects);
router.post('/create', projectController.createProject);
router.post('/test', settingsController.getSshKeys);



export default router;