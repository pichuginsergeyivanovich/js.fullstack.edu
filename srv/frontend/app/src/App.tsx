import './css/App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
//import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header';
import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectsCreate from './components/ProjectsCreate';
import Repositories from './components/Repositories';
import RepositoryCreate from './components/RepositoryCreate';
import Repository from './components/Repository';
import RepositoryClone from './components/RepositoryClone';
import RepositoryFiles from './components/RepositoryFiles';
import RepositoryCommits from './components/RepositoryCommits';
import RepositoryBranches from './components/RepositoryBranches';

function App(props:any) {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("set username in useefferct=",user)

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

/*    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };*/
  }, []);


  const logOut=()=>{
      AuthService.logout();
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(null);
    };

  return (
    
    
    <div className="App">
      <Header user={currentUser} logOut={logOut}></Header>
      <div className=".container-fluid">
        <Routes>
           <Route path={"/"} element={<Home />} />
          {/*<Route exact path={"/home"} element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects-create" element={<ProjectsCreate />} />
          <Route path="/:project/repositories" element={<Repositories />} />
          <Route path="/:project/repository-create" element={<RepositoryCreate />} />
          <Route path="/:project/:repository/" element={<Repository {...props} />} />
          <Route path="/:project/:repository/clone" element={<RepositoryClone {...props} />} />
          <Route path="/:project/:repository/files" element={<RepositoryFiles {...props} />} />
          <Route path="/:project/:repository/commits" element={<RepositoryCommits {...props} />} />
          <Route path="/:project/:repository/branches" element={<RepositoryBranches {...props} />} />
          {/*<Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} /> */}
        </Routes>
      </div>


      
    </div>
  );
}

export default App;
