import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Dropdown, Tab } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';



function RepositoryActions(props:any) {

  const navigate = useNavigate();

  const [activeKey, SetActiveKey] = useState("0")


  useEffect(()=>{

    const skey = props?.active_key?props?.active_key:"0"
    console.log("set key = ",skey)
    SetActiveKey(skey)

  },[props?.active_key])
  



  return (
    <Accordion activeKey={activeKey} defaultActiveKey="0" onSelect={(e) => SetActiveKey(String(e))} >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Repository</Accordion.Header>
        <Accordion.Body>


        <ListGroup>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"clone")}>Clone</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"files")}>Files</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"commits")}>Commits</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"branches")}>Branches</ListGroup.Item>
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Settings</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"profile")}>Profile</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>navigate("/settings/sshkeys")}>SSH Keys</ListGroup.Item>
        </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default RepositoryActions;