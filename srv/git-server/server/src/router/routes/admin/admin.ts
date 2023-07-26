import {Router} from 'express'
import usersController from '../../../controller/users.controller';
import passport from 'passport'

const router = Router()
router.use(passport.authenticate("jwt",{session:false}))
router.get('/users', usersController.getAllUsers);

export default router;