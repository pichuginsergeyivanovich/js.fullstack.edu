
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
    


  const getRepositoryCommits = (project:string, repository:string, branch:string, path:string) => {

    console.log("getRepositoryCommits called");

    const token=JSON.parse(localStorage.getItem("token")??"");

    const data={"branch":branch, "path": path}

    return axios
      .post(`${API_URL}${project}/${repository}/commits`,data, {headers:{"Authorization": `Bearer ${token}`}})
      .then((response) => {
        
        console.log("response.data.commits=",response.data.commits);
       
        const data = response.data?.commits; 

        return data
       
      });
  };    


const getRepositoryBranches = (project:string, repository:string, branch:string) => {

    const token=JSON.parse(localStorage.getItem("token")??"");

    
    console.log("getRepositoryBranches in projectservice")

    return axios
      .post(`${API_URL}${project}/${repository}/branches`,null, {headers:{"Authorization": `Bearer ${token}`}})
      .then((response) => {

        const data:string = response.data?.branches
        
        console.log("data=",data); 

        if(data){

        const regex = new RegExp(/(?<selected>\*|\s)\s(?<name>\S*)\s*(?<hash>[0-9a-zA-Z]{7})/g);
        
        var result = Array.from( data.matchAll(regex)).map((e)=>{

          console.log(e)

          return {selected:e.groups?.selected.trim()==='*', name:e.groups?.name.trim(), hash:e.groups?.hash}
        });

        
        
        console.log("getRepositoryBranches in projectservice - then - response=",result);

        console.log("getRepositoryBranches in projectservice - then - response.data.branches=",response.data.branches);
       
        

        return result
      }        
        return []
      });
    
  };    



      
const ProjectsService = {
    getProjects,
    create,
    getRepositories,
    createRepo,
    getRepositoryFiles,
    getRepositoryCommits,
    getRepositoryBranches,

  }
  
  export default ProjectsService;