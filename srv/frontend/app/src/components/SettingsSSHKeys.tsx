import "../css/registration.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RepositoryActions from "./RepositoryActions";
import BreadcrumbRow from "./BreadCrumbRow";
import AddSSHKey from "./AddSSHKey";
import SettingsService from "../services/settings.service";
import ProjectsService from "../services/projects.service";
import Sidebar from "./Sidebar";

const SettingsSSHKeys = (props: any) => {
  const d: Array<any> = [];
  const [keys, SetKeys] = useState(d);

  useEffect(() => {
   SettingsService.getSshKeys().then((data) => {
      console.log("getsshkeys=", data);
      // var list:any[]=[...data] as any[];
      // SetKeys(list);
      // console.log("keys=",list)
    });
  }, [keys]);

  const AddSSHKeyCallback=(key:any)=>{

    let nkeys:any[] = [...keys, key]

    SetKeys(nkeys)

  }

  return (
    <>
   <Sidebar
        settings="true"
      />
      {/* <div className="card card-container container-inner">
      <BreadcrumbRow settings="settings"></BreadcrumbRow> */}
      <div className="repository-container">

          <AddSSHKey AddSSHKeyCallback={AddSSHKeyCallback}/>

          <div className="container">
            {keys.map((e, i) => (
              <div key={i}>
                <div>{e.name}</div>
                <div className="ssh-key-view">{e.key}</div>
              </div>
            ))}
          </div>
        </div>
        {/* </div>     */}
    </>
  );
};

export default SettingsSSHKeys;
