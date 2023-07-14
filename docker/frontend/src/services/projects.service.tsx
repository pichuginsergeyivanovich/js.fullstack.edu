
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


const getProjects = () => {
    return [
      {
          "id": 1,
          "name": "moscow project",
          "description": "test description",
          "userId": 1,
          "createdAt": "2023-07-11T19:39:17.609Z",
          "updatedAt": "2023-07-11T19:39:17.609Z"
      },
      {
          "id": 2,
          "name": "vocation",
          "description": "test description",
          "userId": 1,
          "createdAt": "2023-07-11T19:39:20.340Z",
          "updatedAt": "2023-07-11T19:39:20.340Z"
      },
      {
          "id": 3,
          "name": "new year template",
          "description": "test description",
          "userId": 1,
          "createdAt": "2023-07-11T19:39:21.223Z",
          "updatedAt": "2023-07-11T19:39:21.223Z"
      },
      {
          "id": 4,
          "name": "auth dev server",
          "description": "test description",
          "userId": 1,
          "createdAt": "2023-07-11T19:39:23.280Z",
          "updatedAt": "2023-07-11T19:39:23.280Z"
      },
      {
        "id": 5,
        "name": "react project",
        "description": "test description",
        "userId": 1,
        "createdAt": "2023-07-11T19:39:17.609Z",
        "updatedAt": "2023-07-11T19:39:17.609Z"
    },
    {
        "id": 6,
        "name": "jsonp implement",
        "description": "test description",
        "userId": 1,
        "createdAt": "2023-07-11T19:39:20.340Z",
        "updatedAt": "2023-07-11T19:39:20.340Z"
    },
    {
        "id": 7,
        "name": "javascript tuts",
        "description": "test description",
        "userId": 1,
        "createdAt": "2023-07-11T19:39:21.223Z",
        "updatedAt": "2023-07-11T19:39:21.223Z"
    },
    {
        "id": 8,
        "name": "git server",
        "description": "test description",
        "userId": 1,
        "createdAt": "2023-07-11T19:39:23.280Z",
        "updatedAt": "2023-07-11T19:39:23.280Z"
    }
    ]
  };

const ProjectsService = {
    getProjects
  }
  
  export default ProjectsService;