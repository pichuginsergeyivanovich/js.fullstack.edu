
import axios from "axios";
const API_URL = "http://localhost:8080/api/public/auth/";


const register = (email:string, password:string, lastname:string, firstname:string) => {
  return axios.post(API_URL + "register", {
    "email": email,
    "password":password,
    "lastname":lastname,
    "firstname":firstname
});
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    /*return axios.post(API_URL + "logout").then((response) => {
      return response.data;
    });*/
  };


const login = (username:string, password:string) => {
    return axios
      .post(API_URL + "login", {"email": username, "password":password})
      .then((response) => {
        console.log(response.data);
        if (response.data.user) 
          localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.token) 
          localStorage.setItem("token", JSON.stringify(response.data.token));
        
  
        return response.data;
      });
  };


const getCurrentUser = () => {

    var user = localStorage.getItem("user")

    return user==null?null:JSON.parse(user);
  };

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  }
  
  export default AuthService;