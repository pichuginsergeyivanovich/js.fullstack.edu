import "../css/registration.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import ProjectsService from "../services/projects.service";
import Dropdown from "react-bootstrap/Dropdown";
import Sidebar from "./Sidebar";

const Projects = () => {
  const d: Array<any> = [];
  const [plist, setPlist] = useState(d);
  const navigate = useNavigate();

  useEffect(() => {
    ProjectsService.getProjects().then((resp) => {
      var list: any = [...resp] as any;

      setPlist(list);

      console.log("plist=", list);
    });
  }, []);

  return (
    <>
      <Sidebar settings="true" />
      <div className="projects-container">
            <ul>
        <li className="card-body projects-title-header">
        <div className="card-title-container">
        <div className="card-title-container-header">
                <h5 className="card-title projects-title">Your Projects</h5>
        </div>
        <button className="btn btn-primary button-vc" type="button"  onClick={(e) => {navigate("/projects-create");}}>new project</button>
          </div>
        </li>
        
                {plist.map((e) => (
          <li key={e.id} className="card-body">
            <div className="projects-container-list-item-container ">
              <div className="card-title-container-header">
                <h5 className="projects-title">{e.name}</h5>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="base-dropdown-toggle">
                  &#8942;
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Open</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <p className="projects-text">{e.description}</p>
            <a href={`/${e.name}/repositories`} className="btn btn-primary">
              Go this project
            </a>
          </li>
        ))}          
        </ul>
 
      </div>
   </>
  );
};

export default Projects;
