import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from './RepositoryActions';
import BreadcrumbRow from './BreadCrumbRow';
import Sidebar from './Sidebar';
import BranchList from './BranchList';

const RepositoryBranches = (props:any) => {

    let { project, repository } = useParams();

      console.log("useParams=",project);


    return (
        <>
        <Sidebar
          settings="true"
          repository={{ name: repository, project: project }}
        />
        <div className="card card-container container-inner">
          <BreadcrumbRow project={project} repository={repository}></BreadcrumbRow>
          
        <BranchList></BranchList>

          
        </div>
      </>

    );
};

export default RepositoryBranches;