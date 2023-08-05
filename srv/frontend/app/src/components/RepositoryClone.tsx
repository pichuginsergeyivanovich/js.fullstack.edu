import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from './RepositoryActions';

const RepositoryClone = (props:any) => {

    let { project, repository } = useParams();

    console.log("useParams=",project);
  
    const navigate = useNavigate();


    const onActionCloneHandler=(e:any, action:string)=>{
     
        const url = `/${project}/${repository}/${action}`
        
        navigate(url)
        
        console.log(action, " clicked")
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

                <p className='repository-container-content'>
                    <p>Clone this repository using command:</p>

                <p>{`git clone git@localhost:/app/server/storage/${repository}.git`}</p>
                </p>

            </div>

        
           
        </div>


    );
};

export default RepositoryClone;