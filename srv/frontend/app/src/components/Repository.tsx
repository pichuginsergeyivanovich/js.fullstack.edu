import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from './RepositoryActions';
import BreadcrumbRow from './BreadCrumbRow';
import Sidebar from './Sidebar';

const Repository = (props:any) => {

    let { project, repository } = useParams();

    console.log("useParams=",project);
  
    const navigate = useNavigate();


    const onActionCloneHandler=(e:any, action:string)=>{
     
        const url = `/${project}/${repository}/${action}`
        
        navigate(url)
        
        console.log(action, " clicked")
    }

    return (
        <>
        <Sidebar settings="true"/>
                <div className="card card-container container-inner">
            <BreadcrumbRow project={project} repository={repository} ></BreadcrumbRow>

            {/* <div className='col-md-2'>
              
                <div>
                    { <RepositoryActions
                    
                    onActionCloneHandler={onActionCloneHandler}
                    /> }
                </div>

            </div> */}
            <div className='col-md-10'>

            </div>

        
           
        </div>

        </>
    );
};

export default Repository;