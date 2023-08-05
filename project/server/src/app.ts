import express,{Router, Response, Request} from 'express'
import { stdout } from 'process';
import { promisify } from 'util';
const{ exec}  = require("child_process")
const bodyParser = require('body-parser')

const fs = require('fs');
const os = require('os');
const path = require('path');

let exec_async=promisify(exec);
``
function readJSONFile(filename:string, callback:any) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

const app = express();
const port = 3000;
const router = Router();

const base_dir="c:\\dev\\local_git_server"
const base_dir_ssh="/mnt/c/dev/local_git_server"

app.use(bodyParser.json());
//app.use(express.json());
app.use(router);


router.get('/repository/list', (req: Request, res: Response) => {
  
  readJSONFile('./repo/repo.json', function (err:any, json: JSON) {
    if(err) { throw err; }
    res.send(json["list"]);
  });
});
router.get('/repository/:repo', (req: Request, res: Response) => {
  console.log(req.params.repo);
  
  readJSONFile('./repo/repo_win.json', function (err:any, json: JSON) {
    if(err) { throw err; }

    let arr:Array<any>=json["list"].filter((e)=>{
      return e.name==req.params.repo
    });
    let repo=arr.length==0?null:arr[0];
    console.log(repo);
    console.log(repo["path"]);

    var Promise = require('bluebird');exec("git branch",{cwd: repo["path"]}, (error1, stdout1, stderr1) => {
            if (error1) {
              console.log(`error: ${error1.message}`);
              return;
          }
          if (stderr1) {
              console.log(`stderr: ${stderr1}`);
              return;
          }

          let uniqueMetricsArray = String(stdout1).trim().split(/\r?\n/);
          console.log(`stdout: ${uniqueMetricsArray}`);

          res.send(JSON.stringify(uniqueMetricsArray))
      });
  });
});


//curl -H "Content-type: application/json" -d "{\"name\":\"project_01\"}" -X POST http://localhost:3000/repository/new
router.post('/repository/new',function(request: Request, response: Response){
  console.log("repository name:",request.body?.name);      // your JSON
  

  var cmd_text=`mkdir ${request.body.name}.git`;

  console.log(cmd_text);


  exec_async(cmd_text,{cwd: base_dir}).then(stdout=>{
      console.log(cmd_text,':success');

      let curr_dir=`${base_dir}\\${request.body?.name}.git`;
      console.log(`curr_dir = ${curr_dir}`);
      cmd_text="git init --bare";
      exec_async(cmd_text,{cwd: curr_dir}).then(stdout=>{
              console.log(cmd_text,':success');
              const server = "localhost";
              const git_user = "git";

              cmd_text=`git remote add origin ${git_user}@${server}:${base_dir_ssh}/${request.body?.name}.git`;
              exec_async(cmd_text,{cwd: curr_dir}).then(stdout=>{
                console.log(cmd_text,':success');

                const tmp_dir = `${base_dir}/tmp/${request.body?.name}_tmp`
                cmd_text=`mkdir tmp && cd tmp && mkdir ${request.body?.name}_tmp`;
                
                exec_async(cmd_text,{cwd: base_dir}).then(stdout=>{
                //fs.mkdirSync(path.join("/tmp"), { recursive: true });
                  //fs.mkdir(tmp_dir, { recursive: true , mode:777},(err)=>{
                    console.log(cmd_text,':success');

                  cmd_text="git init";
                  exec_async(cmd_text,{cwd: tmp_dir}).then(stdout=>{
                    console.log(cmd_text,':success');

                    var createStream = fs.createWriteStream(`${tmp_dir}/Readme.txt`);
                    createStream.end();
                    
                    cmd_text="git add .";
                    exec_async(cmd_text,{cwd: tmp_dir}).then(stdout=>{
                      console.log(cmd_text,':success');
                      
                      
                      cmd_text="git commit -m \"Initial commit\"";
                      exec_async(cmd_text,{cwd: tmp_dir}).then(stdout=>{
                      console.log(cmd_text,':success');

                      cmd_text=`git remote add origin ${git_user}@${server}:${base_dir_ssh}/${request.body?.name}.git`;
                      exec_async(cmd_text,{cwd: tmp_dir}).then(stdout=>{
                        console.log(cmd_text,':success');

                        cmd_text=`git push origin master`;
                        exec_async(cmd_text,{cwd: tmp_dir}).then(stdout=>{
                          console.log(cmd_text,':success');
                        });
  

                      });
  

                    });
                    
                  });
                    

                  });

                });

              });



          });
   });

  response.send(request.body);

});








app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});