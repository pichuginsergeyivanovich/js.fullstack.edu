import dotenv from 'dotenv'
import logger from './logger';

logger.info("path=", `${__dirname}/env/.${process.env.NODE_ENV}.env`);

dotenv.config({path:`${__dirname}/env/.${process.env.NODE_ENV}.env`});

logger.info("db_uri=", process.env.DB_URI);

import express from 'express'
import {sequelize} from './sequelize'
import cookieParser from 'cookie-parser'
import router from './router/index'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Role from './models/role.model';
import User, { UserRoles } from './models/user.model';
const cors = require('cors');
const port = process.env.PORT;

const app=express();
passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWTSECRET
    },(user, done)=>{
        done(null, user);
    }
))
app.use(cors({
    origin: '*'
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api", router)

async function start(){
    try{
        await sequelize.sync({alter:true, force:true})
        .then(()=>{
            Role.bulkCreate([
                {id:1, name:UserRoles.ADMIN},
                {id:2, name:UserRoles.USER}
            ]);
        });
        logger.info("[OK] Sequelize synced.")

        app.listen(port);
        logger.info(`[OK] Server started on port ${port}.`)
    }
    catch(e){
        logger.error(e);
        logger.info("[ERROR] Server start failed.")
    }
}


start();