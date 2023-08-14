import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import SettingsService from '../services/settings.service';

const required = (value:boolean) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };


const AddSSHKey = (props:any) => {

    const [name, SetName] = useState("");
    const [key, SetKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const refSubmit=useRef(null);
    const refName=useRef(null);
    const refKey=useRef(null);

    useEffect(()=>{

        if (name.length===0 || key.length===0){
            (refSubmit.current! as HTMLButtonElement).setAttribute("disabled","");
            setMessage("[error] key and its name are required!"); 
        }
        else{
            (refSubmit.current! as HTMLButtonElement).removeAttribute("disabled");
            setMessage(""); 
        }
        
    },[key, name])

    const handleAddKeySubmit = (e: any) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);
    
        
          SettingsService.addSshKey(name, key).then(() => {

            props.AddSSHKeyCallback({name:name,key:key});
            SetKey("");
            SetName("");
            (refName.current! as HTMLInputElement).value="";
            (refKey.current! as HTMLTextAreaElement).value="";

              
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
            <h2 className='title'>Add your SSH Keys here</h2>
                <form className="row g-3 form-footer" onSubmit={handleAddKeySubmit}>
                    <div className="col-md-12 form-field">
                        <label htmlFor="validationServerEmail" className="form-label">Name*</label>
                        <div className="input-group has-validation">
                            <input type="text" className="form-control" id="sshkey_name" ref={refName} onChange={(e)=>SetName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-12  form-field">
                        <label htmlFor="validationServer03" className="form-label">Key*</label>
                        <textarea className="form-control" id="validationServer03" required ref={refKey} onChange={(e)=>SetKey(e.target.value)}
                        aria-multiline="true"
                        />
                    </div>
                    <div className="col-md-12 error_message" >
                        <span>{message}</span>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" ref={refSubmit}>Add key</button>
                    </div>
                </form>
        </div>
        </div>

    );
};

export default AddSSHKey;