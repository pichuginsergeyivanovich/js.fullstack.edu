import express,{Router, Response, Request} from 'express'
const bodyParser = require('body-parser')
import passport from 'passport'
const router = Router();

router.get('/', 
passport.authenticate("jwt",{session:false}),
(req: Request, res: Response) => {
   console.log('in passport.authenticate occurs');
    res.send('hello');
  });
export default router;