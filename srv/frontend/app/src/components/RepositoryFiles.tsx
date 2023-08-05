import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from './RepositoryActions';

const file_image = require('../css/file.png');
const folder_image = require('../css/folder.png');
//import * as file_image from '../css/file.png';
//import * as folder_image from '../css/folder.png';


const RepositoryFiles = (props:any) => {

    let { project, repository } = useParams();

    const d:Array<any>=[];

    const [files, setFiles] = useState(d);

    const [rep_path, setRepPath] = useState("./");

    const [rep_path_parent, setRepPathParent] = useState("");

    console.log("useParams=",project);
  
    const navigate = useNavigate();

    const getParentPath=(path:string):string=>{

        let parr= path.split("/").filter(Boolean)
        parr.pop()
        return parr.length===0?"./":`${parr.join("/")}/`
    }


    useEffect(
    ()=>{
    console.log("try getting repo files from path=",rep_path)
    ProjectService.getRepositoryFiles(project!, repository!, "master", rep_path)
     .then(data=>{


        if (data){

        var list:any[]=[...data].map((e,i)=>{


            if(rep_path!=="./"){
                const parent_path = rep_path.replace("./","")

                e.path=e.path?.replace(parent_path,"")
            }

            return e
        }) as any;

        if(rep_path!=="./")
               list=[{"type":"tree", "path":".."},...list]

               

           setFiles(list)
        
        }
        console.log('files=', files)
     })
    },[rep_path])

    const onActionCloneHandler=(e:any, action:string)=>{
     
        const url = `/${project}/${repository}/${action}`
        
        navigate(url)
        
        console.log(action, " clicked")
    }

    const onFileBrowseClick=(e:any, f:any)=>{

        if(f["type"]==="tree"){

            if(f["path"]===".."){

                const new_path=getParentPath(rep_path)

                console.log("new_path=",new_path)

                setRepPath(new_path)
            }
            else{
                const new_path=`${rep_path}${f["path"]}/`

                console.log("new_path=",new_path)

                setRepPath(new_path)
            }

        }
        console.log(e)
    }

    return (

        <div className="repository-container">
            <div>
              
                <div>
                    { <RepositoryActions
                    onActionCloneHandler={onActionCloneHandler}
                    /> }
                </div>

            </div>
            <div>
            <div className='container'>
                <div className='files-row'>
                    <div>type</div>
                    <div>path</div>
                </div>
                    { 
                        files.map( (f,i)=> 
                            
                            (<div className='files-row' key={i} onClick={e=>{onFileBrowseClick(e, f)}}>
                                <div >
                                 {f["type"]==="tree"?
                                (<img src={folder_image} alt='folder'></img>)
                                :
                                (<img src={file_image} alt='file'></img>)
                                 }
                                </div>
                                <div >{f["path"]}</div></div>
                            )
                        )
                    } 

                </div>

            </div>
        </div>


    );
};

export default RepositoryFiles;