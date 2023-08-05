
import axios from "axios";

const API_URL = "http://localhost:8080/api/";
const API_PRJ_URL = "http://localhost:8080/api/projects/";


  const create = (name:string, description:string) => {

    const token=JSON.parse(localStorage.getItem("token")??"");
    
    return axios
      .post(API_PRJ_URL + "create", {"name": name, "description":description},{headers:{'Authorization':`Bearer ${token}`}})
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  };
  const getProjects = () => {
    const token=JSON.parse(localStorage.getItem("token")??"");
    
    return axios.get(API_PRJ_URL, {headers:{"Authorization": `Bearer ${token}`}})
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
    
  };
  const getRepositories = (project:string) => {
    const token=JSON.parse(localStorage.getItem("token")??"");

    console.log("front-getRepositories");
    
    return axios.post(`${API_URL}${project}/repositories/`,{}, {headers:{"Authorization": `Bearer ${token}`}})
    
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
    
  };

  const createRepo = (project:string, name:string, description:string) => {

    const token=JSON.parse(localStorage.getItem("token")??"");
    const data={"project":project, "name": name, "description":description}

    console.log("front-createRepo");

    return axios
      .post(`${API_URL}${project}/repositories/create`,data, {headers:{"Authorization": `Bearer ${token}`}})
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  };  

  const getRepositoryFiles = (project:string, repository:string, branch:string, path:string) => {

    const token=JSON.parse(localStorage.getItem("token")??"");

    const data={"branch":branch, "path": path}

    return axios
      .post(`${API_URL}${project}/${repository}/files`,data, {headers:{"Authorization": `Bearer ${token}`}})
      .then((response) => {
        
        //return response.data;

        const data:string = response.data?.files?.stdout; 

       if(data) {

        console.log("response.data?.files?.stdout=",data);

        const regex = new RegExp(/\d{0,}\s(?<type>\w{0,})\s[0-9A-Fa-f]{40}\t(?<path>(.*){0,}\n)/g);
        
        var result = Array.from( data.matchAll(regex)).map((e)=>{

          console.log(e)

          return {type:e.groups?.type.trim(), path:e.groups?.path.trim()}

        })

        return result
      }

        return []



       

      });
  };  
    
const getProjectsTest = () => {
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
    getProjects,
    create,
    getRepositories,
    createRepo,
    getRepositoryFiles
  }
  
  export default ProjectsService;