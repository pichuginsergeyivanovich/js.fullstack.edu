import User from "../models/user.model";
import {LoginRequest, RegisterRequest } from "../dtos/auth.dto";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserService{

    async createUser(userDTO: RegisterRequest) {

console.log("userDTO=",userDTO)

        const hashPassword = await bcrypt.hash(userDTO.password, 10);

        const user = await User.create({
            email: userDTO.email,
            password: hashPassword,
            firstname:userDTO.firstname,
            lastname:userDTO.lastname,
            pname:userDTO.pname,
            university:userDTO.univirsity

        });
        return user;
    }
    async getAllUsers(){
        const users=User.findAll()
        return users;
    }

    async getUser(loginDTO: LoginRequest){

        const user = await User.findAll({
            where:{
                email: loginDTO.email
            }
        })

        if(loginDTO.email==user[0].email && await bcrypt.compare(loginDTO.password, user[0].password)){

            const token=jwt.sign({
                userId: user[0].id,
                email:user[0].email
            }
                , process.env.JWTSECRET as string);
            return {"token":token, "user":user[0].email};

        }
    }
    // async register(data: RegisterRequest ){
    //     const user = await userService.createUser(userDTO);
    // }
    // async login(data: LoginRequest ){
    //     const token = await userService.getUser(loginDTO);
    //     return token
    // }

}

export default new UserService();