import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function LoggedInUser(props:any) {
  return (
            <NavDropdown title={props.user} id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings/sshkeys">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout" onClick={props.onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
  );
}

export default LoggedInUser;