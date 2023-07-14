import {ProjectDTO } from "../dtos/project.dto";
import Project from "../models/project.model";

class ProjectService{

    async createProject(project: ProjectDTO) {

    console.log("project=",project)

        const newProject = await Project.create({
            name:project.name,
            description:project.description,
            userId:project.userId           
        });
        return newProject;
    }
    async getAllProjects(){
        const projects=Project.findAll()
        return projects;
    }

}

export default new ProjectService();