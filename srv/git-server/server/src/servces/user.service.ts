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

        const user = await User.findOne({
            where:{
                email: loginDTO.email
            }
        })
        console.log("user from db=",user)
        
        if (!user)
            throw new Error("No such user");

            
        

        let valid_pass = await bcrypt.compare(loginDTO.password, user.password)

        if (!valid_pass)
            throw new Error("Invalid credentials");

        const token=jwt.sign({
                userId: user.id,
                email:user.email
            }
                , process.env.JWTSECRET as string);
            return {"token":token, "user":user.email};
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