import express,{Router, Response, Request} from 'express'
const bodyParser = require('body-parser')
import passport from 'passport'
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'supersecret';
opts.issuer = 'pichuginsergeydomain.com';
opts.audience = 'pichuginsergeyaudience.com';

//import helloRouter from './hello.router';
//import authRouter from './auth.router';

import jwt from 'jsonwebtoken'
const app = express();
const port = 3000;

app.use(bodyParser.json());

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   
    return done(null, jwt_payload);

}));


//app.use("/auth",authRouter);
//app.use("/hello",helloRouter);

const router = Router();
//
router.get('/hello', 
    passport.authenticate("jwt",{session:false}),
    (req: Request, res: Response) => {
   console.log('in passport.authenticate occurs');
    res.send('hello');
  });
  //curl -H "Content-type: application/json" -d "{\"username\":\"sipichugin\", \"password\":\"password\"}" -X POST http://localhost:3000/login
  router.post('/login', 
    (req: Request, res: Response) => {
      console.log('req.body=', req.body);
      if(req.body?.username=="sipichugin" && req.body?.password=="password"){
  
          const data={"user":req.body?.username};
          const secret="supersecret";
          const token=jwt.sign(data, secret);

          console.log("Authorization","Bearer "+token)
  
          res.set("Authorization","Bearer "+token);
          return res.status(200).send("authorization success");
  
      }    
      
      res.status(401).send('unauthorized');
    });
  
app.use(router);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });