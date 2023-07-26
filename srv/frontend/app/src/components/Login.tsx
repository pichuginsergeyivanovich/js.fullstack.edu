import '../css/registration.css';
import React, { useState, useRef } from "react";
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

const Login = () => {

    const form_ref = useRef(null);
    const checkBtn = useRef(null);
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const navigate = useNavigate();

    const onChangeUsername = (e:any) => {
        const username = e.target.value;
        setUsername(username);
      };
    
    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        
          AuthService.login(username, password).then(
            () => {
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
        <div className="col-md-12 container">
          <div className="card card-container container-inner">
            <h2 className='title'>Login</h2>
            {/* <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            /> */}
    
            <form onSubmit={handleLogin} ref={form_ref}>
              <div className="form-group  form-field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>
    
              <div className="form-group  form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
    
              <div className="form-group login-button" >
                <button className="btn btn-primary btn-block" disabled={loading} >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
    
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <input type="checkbox" style={{ display: "none" }} ref={checkBtn} />
            </form>
          </div>
        </div>
      );
};

export default Login;