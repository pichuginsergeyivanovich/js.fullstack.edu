import {Router} from 'express'
import authController from '../../../controller/auth.controller';


const router = Router()

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;

//"http://localhost:8080/api/public/auth/register"
//"http://localhost:8080/api/admin/users"