import{Response, Request, NextFunction} from 'express'
import projectService from '../servces/project.service';

class ProjectController{

    async getAllProjects(req: Request, res: Response, next: NextFunction){
        try{
            const users = await projectService.getAllProjects();
            res.send(users)
        }
        catch(e){
            next(e);
        }
    }
    async createProject(req: Request, res: Response, next: NextFunction){
        try{
            console.log(req.user);

            const {userId} = req.user as any
            const dto={name:req.body.name, description: req.body.description, userId}
            const newProject = await projectService.createProject(dto)
            res.send(newProject)
        }
        catch(e){
            next(e);
        }
    }
}

export default new ProjectController();