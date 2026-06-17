import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaHome, FaSearch, FaUserMd, FaPaw, FaStar, FaPlus } from 'react-icons/fa';

export default function Layout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FaPaw className="me-2" />
            PetClinic
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <FaHome className="me-1" />
                Home
              </Nav.Link>
              <NavDropdown title="Owners" id="owners-dropdown">
                <NavDropdown.Item as={Link} to="/owners">
                  <FaSearch className="me-1" />
                  Search
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/owners/add">
                  <FaPlus className="me-1" />
                  Add New
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Veterinarians" id="vets-dropdown">
                <NavDropdown.Item as={Link} to="/vets">
                  <FaUserMd className="me-1" />
                  All
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/vets/add">
                  <FaPlus className="me-1" />
                  Add New
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/pettypes">
                <FaPaw className="me-1" />
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
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
