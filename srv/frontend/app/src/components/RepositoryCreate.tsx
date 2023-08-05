import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";

const RepositoryCreate = () => {

    let { project } = useParams();

    console.log("useParams=",project);
  

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const refSubmit=useRef(null);

    const navigate = useNavigate();

    useEffect(()=>{
        if (name.length===0){
            (refSubmit.current! as HTMLButtonElement).setAttribute("disabled","");
            setMessage("[error] Name is required"); 
        }
        else{
            (refSubmit.current! as HTMLButtonElement).removeAttribute("disabled");
            setMessage(""); 
        }
    },[name])


    

    const handleSubmitCreate = (e: any) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);
    
        
          ProjectService.createRepo(project!, name, description).then(() => {
              navigate(`/${project}/${name}/`);
              window.location.reload();
            },
            (error:any) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setLoading(false);
              setMessage(resMessage);
            }
          );
        }

    return (

        <div className="col-md-10 container">
        <div className="card card-container container-inner">
            <h2 className='title'>New Repository Creation</h2>
                <form className="row g-3 form-footer" onSubmit={handleSubmitCreate}>
                    <div className="col-md-12 form-field">
                        <label htmlFor="validationServerEmail" className="form-label">Name*</label>
                        <div className="input-group has-validation">
                            <input type="name" className="form-control" id="validationServerUsername" onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-12  form-field">
                        <label htmlFor="validationServer03" className="form-label">Description</label>
                        <input type="text" className="form-control" id="validationServer03"  onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div className="col-md-12 error_message" >
                        <span>{message}</span>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" ref={refSubmit}>Submit repository creation</button>
                    </div>
                </form>
        </div>
        </div>

    );
};

export default RepositoryCreate;