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
  } catch (e:any) {
    errors.push(e);
    console.log("[error]",command)
    throw e;
  }
}/*
function cmd(...command: any[]) {
    let p = spawn(command[0], command.slice(1));
    return new Promise((resolve) => {
      p.stdout.on("data", (x:any) => {
        process.stdout.write(x.toString());
      });
      p.stderr.on("data", (x:any) => {
        process.stderr.write(x.toString());
      });
      p.on("exit", (code:any) => {
        resolve(code);
      });
    });
  }
*/
function sleep(ms:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
class RepositoryService{

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

        
  /*      cmd("git init --bare", dir, errors).then(()=>{
          cmd(`mkdir -p ${tmp_dir}`,"", errors).then(()=>{
            cmd("git init", tmp_dir, errors).then(()=>{
              cmd("touch readme.txt", tmp_dir, errors).then(()=>{
                cmd(`git config user.email \"${user?.email}\"`, tmp_dir, errors).then(()=>{
                  cmd(`git config user.name \"${user?.firstname} ${user?.lastname}\"`, tmp_dir, errors).then(()=>{
                    cmd("git add . && git commit -m\"initial commit\"", tmp_dir, errors).then(()=>{
                      cmd(`git remote add origin git@localhost:${dir}`, tmp_dir, errors).then(()=>{
                        cmd(`git config --global --add safe.directory ${tmp_dir}`, tmp_dir, errors).then(()=>{
                                      //cmd("chown -R git /app/server/storage/", tmp_dir).then(()=>{
                                cmd("git push origin master", tmp_dir, errors).then(()=>{
                                  cmd(`rm -rd ${tmp_dir}`, tmp_dir, errors).then(()=>{

                                    return newRepo;
                                        //    })
                                          })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
      })
    })
    */
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