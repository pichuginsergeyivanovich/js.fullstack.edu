import express,{Router, Response, Request} from 'express'
import jwt from 'jsonwebtoken'

const bodyParser = require('body-parser')
import passport from 'passport'
const router = Router();

router.post('/login', 
(req: Request, res: Response) => {
    console.log('req.body=', req.body);
    if(req.body?.username=="sipichugin" && req.body?.password=="password"){

        const data={"user":req.body?.username};
        const secret="supersecret";
        const token=jwt.sign(data, secret);

        res.set("Authorization","Bearer "+token);
        return res.status(200).send("authorization success");

    }    
    
    res.status(401).send('unauthorized');
  });
export default router;