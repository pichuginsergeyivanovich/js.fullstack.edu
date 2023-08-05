import { Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Dropdown, Tab } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function RepositoryActions(props:any) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Repository</Accordion.Header>
        <Accordion.Body>


        <ListGroup>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"clone")}>Clone</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"files")}>Files</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"commits")}>Commits</ListGroup.Item>
          <ListGroup.Item action onClick={(e)=>props.onActionCloneHandler(e,"branches")}>Branches</ListGroup.Item>
          {/* <ListGroup.Item action variant="success">
            Success
          </ListGroup.Item>
          <ListGroup.Item action variant="danger">
            Danger
          </ListGroup.Item>
          <ListGroup.Item action variant="warning">
            Warning
          </ListGroup.Item>
          <ListGroup.Item action variant="info">
            Info
          </ListGroup.Item>
          <ListGroup.Item action variant="light">
            Light
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Dark
          </ListGroup.Item> */}
        </ListGroup>

          
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default RepositoryActions;