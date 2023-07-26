import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../services/auth.service";
import ProjectsService from '../services/projects.service';
import Dropdown from 'react-bootstrap/Dropdown';


const Repositories = () => {

  let { project } = useParams();

  console.log("useParams=",project);

  const d:Array<any>=[];
  const [plist, setPlist] = useState(d);
  const navigate = useNavigate();


  useEffect(()=>{

    ProjectsService.getRepositories(project??"").then(resp=>{

      var list:any=[...resp] as any;
  
        setPlist(list);
  
        console.log("plist=",list)
  
      });
      
    
},[]);


    return (
      <div>
      <h2 className='title'>{`${project} repositories`}</h2>
      <div className="container-p">
      { 
        plist.map((e)=>(

          
           <div key={e.id} className="card-body">
            <div className='card-title-container'>
            <div className='card-title-splitter'>&nbsp;</div>
             <div className='card-title-container-header'><h5 className="card-title">{e.name}</h5></div>
             
             <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">&#8942;</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Open</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                </Dropdown.Menu>
             </Dropdown>
             </div>
             <p className="card-text">{e.description}</p>
             <a href={`api/${e.name}/repositories`} className="btn btn-primary">Go this project</a>
          </div>

          ))
      
      }
      <div className="d-grid gap-2 col-12 mx-auto unset-backcolor" >
        <div className="d-grid gap-2 col-6 mx-auto unset-backcolor">
          <button className="btn btn-primary" type="button" onClick={(e)=>{
            navigate(`/${project}/repository-create`)
          }}>new repository</button>
        </div>
      </div>

      </div>
      </div>
    );
};

export default Repositories;