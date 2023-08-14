import {Router} from 'express'
import passport from 'passport'
import settingsController from '../../../controller/settings.controller';

const router = Router()
router.use(passport.authenticate("jwt",{session:false}))
router.post('/sshkey/list', settingsController.getSshKeys);
router.post('/sshkey/add', settingsController.addSshKey);



export default router;