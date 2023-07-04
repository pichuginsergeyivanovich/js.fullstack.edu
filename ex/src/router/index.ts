import {Router} from 'express';
import publicRouter from './routes/public/index'
import adminRouter from './routes/admin/admin'

const router=Router();


router.use("/public", publicRouter)
router.use("/admin", adminRouter)

export default router;