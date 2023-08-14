import "../css/registration.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from "./RepositoryActions";
import BreadcrumbRow from "./BreadCrumbRow";
import Sidebar from "./Sidebar";

const RepositoryClone = (props: any) => {
  let { project, repository } = useParams();

  console.log("useParams=", project);

  const navigate = useNavigate();

  const onActionCloneHandler = (e: any, action: string) => {
    const url = `/${project}/${repository}/${action}`;

    navigate(url);

    console.log(action, " clicked");
  };

  return (
    <>
      <Sidebar
        settings="true"
        repository={{ name: repository, project: project }}
      />
      <div className="card card-container container-inner">
        <BreadcrumbRow project={project} repository={repository}></BreadcrumbRow>
        <div>
          <div className="clone-text">
            <div>
              <span>Clone this repository using command:</span>
              <br></br>
              <div className="code">
                {`git clone git@localhost:/app/server/storage/${project}/${repository}.git`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepositoryClone;
