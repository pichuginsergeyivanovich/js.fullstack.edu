import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'


export const sequelize = new Sequelize(String(process.env.DB_URI),{
    dialect:'postgres',
    models:[`${__dirname}/models/`]
});