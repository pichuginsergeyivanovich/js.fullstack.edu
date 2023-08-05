import { RepositoryDTO } from "../dtos/repository.dto";
import Project from "../models/project.model";
import Repository from "../models/repository.model";
import User from "../models/user.model";
//const { exec, spawn } = require("child_process");
//const process = require("process");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//import logger from "../logger"
import * as fs from 'fs';

async function cmd(command:string, cwd:string="", errors:Array<any>=[]) {
  try {
    const { stdout, stderr } =cwd!=""? await exec(command, {cwd:cwd}):await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log("[success]",command)
    return {stdout:stdout, stderr:stderr}
  } catch (e:any) {
    errors.push(e);
    console.log("[error]",command)
    throw e;
  }
}
function sleep(ms:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
class RepositoryService{

  async getRepositoryFiles(project:string,  repository: string, branch:string, path:string) {

    var errors:Array<any>=[]

    var dir = `/app/server/storage/${repository}.git`;
    try{

      await cmd(`git config --global --add safe.directory ${dir}`, dir, errors)

      const result = await cmd(`git ls-tree ${branch} "${path}"`, dir, errors)

      console.log('result=',result)

      return {
        error: false, 
        files: result,
      };
  
}
catch(e){

  console.log("occur in catch", errors)
  return {error:true}
}
  }

    async createRepository(repo: RepositoryDTO) {

      var errors:Array<any>=[]
      const newRepo = await Repository.create({
        name:repo.name,
        description:repo.description,
        userId:repo.userId,
        projectId:repo.projectId
    });
    var dir = `/app/server/storage/${repo.name}.git`;
    var tmp_dir = `/app/server/storage/${repo.name}.tmp`;
    const force_recreate_repo=true;


      try{

    console.log("repo =",repo)


        const user = await User.findOne({
            where:{
                id:repo.userId
            }
        })
        
        
        
        if (force_recreate_repo && fs.existsSync(dir))
        {
            fs.rmdirSync(dir, { recursive: true });
        }
        fs.mkdirSync(dir, { recursive: true });

        await cmd("git init --bare", dir, errors)

        await cmd(`mkdir -p ${tmp_dir}`,"", errors)
        
        await cmd("git init", tmp_dir, errors)

        await cmd("touch readme.txt", tmp_dir, errors)
        
        await cmd(`git config user.email \"${user?.email}\"`, tmp_dir, errors)

        await cmd(`git config user.name \"${user?.firstname} ${user?.lastname}\"`, tmp_dir, errors)
        
        await cmd("git add . && git commit -m\"initial commit\"", tmp_dir, errors)
        
        await cmd(`git remote add origin git@localhost:${dir}`, tmp_dir, errors)
        
        await cmd(`git config --global --add safe.directory ${tmp_dir}`, tmp_dir, errors)
        
        await cmd("chown -R git /app/server/storage/", tmp_dir, errors)
        
        await cmd("git push origin master", tmp_dir, errors)
        
        await cmd(`rm -rd ${tmp_dir}`, tmp_dir, errors)

        return {
          error: false, 
          repository: newRepo,
          text: `to clone use - git clone git@localhost:${dir}`,
          clone_ref: `git@localhost:${dir}`
        };
  }
  catch(e){

    console.log("occur in catch", errors)

    if (errors && errors.length>0){

      console.log("return error, rollback changes")

      await cmd(`rm -rd ${tmp_dir}`);

      await cmd(`rm -rd ${dir}`);

      const count =  await Repository.destroy({
        where:{id:newRepo.id}
      });      

      return {
        error:true,
        text:JSON.stringify(errors)
      };
  }

      return {};
    }
  }


}

export default new RepositoryService();