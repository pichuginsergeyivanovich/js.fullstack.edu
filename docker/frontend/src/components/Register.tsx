import '../css/registration.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const required = (value:boolean) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const refPassword=useRef(null);
    const refRepeatPassword=useRef(null);
    const refSubmit=useRef(null);

    const navigate = useNavigate();

    useEffect(()=>{

        if (email.length==0 || password.length==0 || rpassword!=password ){
            (refSubmit.current! as HTMLButtonElement).setAttribute("disabled","");
            setMessage("[error] Passwords do not match"); 
        }
        else{
            (refSubmit.current! as HTMLButtonElement).removeAttribute("disabled");
            setMessage(""); 
        }
        
    },[email, password, rpassword])


    


const onChangeRepeatPassword=(e:any)=>{

    
    setRPassword(e.target.value);
/*    var field=(refPassword.current as any) as HTMLInputElement
    if(e.target.value==field.value)
        
    else
        console.log("[error] passwords not equal!")*/
}
    const onChangePassword=(e:any)=>{
        setPassword(e.target.value);
        
        /*var field=(refPassword.current as any) as HTMLInputElement

        if(e.target.value==field.value)
            
        else
            console.log("[error] passwords not equal!")*/
    }

    const handleRegister = (e: any) => {

        var field=(refPassword.current as any) as HTMLInputElement
        var rfield=(refRepeatPassword.current as any) as HTMLInputElement

        if(field.value !=rfield.value)
        {
            setMessage("[error] Passwords do not match");    
            console.log(message);
            
        }

        e.preventDefault();

        setMessage("");
        setLoading(true);
    
        
          AuthService.register(email, password, lastname, firstname).then(() => {
              navigate("/profile");
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
            <h2 className='title'>Registration</h2>
                <form className="row g-3 form-footer" onSubmit={handleRegister}>
                    <div className="col-md-12 form-field">
                        <label htmlFor="validationServerEmail" className="form-label">Email*</label>
                        <div className="input-group has-validation">
                            <input type="email" className="form-control" id="validationServerUsername" onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-12  form-field">
                        <label htmlFor="validationServer03" className="form-label">Password*</label>
                        <input type="password" className="form-control" id="validationServer03"  required ref={refPassword} onChange={onChangePassword}/>
                    </div>
                    <div className="col-md-12  form-field">
                        <label htmlFor="validationServer05" className="form-label">Repeat password*</label>
                        <input type="password" className="form-control" id="validationServer05" required ref={refRepeatPassword} onChange={onChangeRepeatPassword}/>
                    </div>
                    <div className="col-md-12  form-field">
                        <label htmlFor="validationServer01" className="form-label">First name</label>
                        <input type="text" className="form-control" id="validationServer01" onChange={(e)=>setFirstname(e.target.value)} />
                    </div>
                    <div className="col-md-12  form-field">
                        <label htmlFor="validationServer02" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="validationServer02"  onChange={(e)=>setLastname(e.target.value)} />
                    </div>
                    <div className="col-md-12 error_message" >
                        <span>{message}</span>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" ref={refSubmit}>Submit registration</button>
                    </div>
                </form>
        </div>
        </div>

    );
};

export default Register;