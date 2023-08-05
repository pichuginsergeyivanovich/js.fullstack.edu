import{Response, Request, NextFunction} from 'express'
import repositoryService from '../servces/repository.service';
import Project from '../models/project.model';
//import logger from '../logger';
import Repository from '../models/repository.model';
import projectService from '../servces/project.service';
//import projectService from '../servces/project.service';

class RepositoryController{


    async getAllRepositories(req: Request, res: Response, next: NextFunction){
        try{
            console.log('call to RepositoryController.getAllRepositories')

            const {userId} = req.user as any

            const project= await Project.findOne({
                where:{
                    name:req.params.project
                }
            });


            if(project ==null || project==undefined)
                res.status(501).send("Error")

            const projectId = (project as Project).id

            const repos=await Repository.findAll({
                where:{
                    userId:userId,
                    projectId:projectId
                }
            });
            console.log("repos found=",repos)

            res.send(repos)
        }
        catch(e){
            console.log(e);
            next(e);
        }
    }
    async createRepository(req: Request, res: Response, next: NextFunction){
        try{
            console.log("req.user=", req.user);
            console.log("req.params=",req.params);

            //res.send("test response");
            //return;

            const {userId} = req.user as any

            const project= await Project.findOne({
                where:{
                    name:req.params.project
                }
            });


            if(project ==null || project==undefined)
                res.status(501).send("Error")

            const projectId = (project as Project).id

            console.log("projectId=", projectId)

            const dto={name: req.body.name, description: req.body.description, userId: userId, projectId: projectId}

            const newProject = await repositoryService.createRepository(dto)
            
            res.send(newProject)
            
        }
        catch(e){
            next(e);
        }
    }

    async getRepositoryFiles(req: Request, res: Response, next: NextFunction){
        try{
            console.log("req.user=", req.user);
            console.log("req.params=",req.params);

            console.log("req.params=",req.body.branch);
            console.log("req.params=",req.body.path);

            const files=await repositoryService.getRepositoryFiles(req.params.project, req.params.repository, req.body.branch, req.body.path)


            res.send(files);
        }
        catch(e){
            next(e);
        }
    }


}

export default new RepositoryController();