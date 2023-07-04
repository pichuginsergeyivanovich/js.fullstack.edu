import { RegisterRequest, LoginRequest } from "../dtos/auth.dto";
import userService from "./user.service";

class AuthService{
    async register(userDTO: RegisterRequest ){
        const user = await userService.createUser(userDTO);
    }
    async login(loginDTO: LoginRequest ){
        const token = await userService.getUser(loginDTO);
        return token
    }

}

export default new AuthService();