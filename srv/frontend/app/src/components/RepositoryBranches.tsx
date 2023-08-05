import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from './RepositoryActions';

const RepositoryBranches = (props:any) => {

    let { project, repository } = useParams();

    console.log("useParams=",project);
  
    const navigate = useNavigate();


    const onActionCloneHandler=(e:any, action:string)=>{
     
        const url = `/${project}/${repository}/${action}`
        
        navigate(url)
        
        console.log(action, " clicked")
    }

    return (

        <div className="card card-container container-inner">
            <div className='col-md-2'>
              
                <div>
                    { <RepositoryActions
                    
                    onActionCloneHandler={onActionCloneHandler}
                    /> }
                </div>

            </div>
            <div className='col-md-10'>

            </div>

        
           
        </div>


    );
};

export default RepositoryBranches;