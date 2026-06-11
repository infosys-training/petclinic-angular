import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaHome, FaSearch, FaUserMd, FaList, FaPaw, FaStar } from 'react-icons/fa';

export default function Layout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FaPaw className="me-2" />
            PetClinic
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <FaHome className="me-1" />
                Home
              </Nav.Link>
              <NavDropdown title={<><FaSearch className="me-1" />Owners</>} id="owners-dropdown">
                <NavDropdown.Item as={Link} to="/owners">
                  Search
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/owners/add">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={<><FaUserMd className="me-1" />Veterinarians</>} id="vets-dropdown">
                <NavDropdown.Item as={Link} to="/vets">
                  All
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/vets/add">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/pettypes">
                <FaList className="me-1" />
                Pet Types
              </Nav.Link>
              <Nav.Link as={Link} to="/specialties">
                <FaStar className="me-1" />
                Specialties
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}
