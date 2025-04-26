import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/Home';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-gray-100">
        <Navbar bg="primary" expand="lg" variant="dark" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">
              <i className="fas fa-graduation-cap me-2"></i>Student Management
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" onClick={() => window.scrollTo(0, 0)}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/students" onClick={() => window.scrollTo(0, 0)}>
                  View List
                </Nav.Link>
                <Nav.Link as={Link} to="/add" onClick={() => window.scrollTo(0, 0)}>
                  Add Student
                </Nav.Link>
                <Nav.Link as={Link} to="/edit" onClick={() => window.scrollTo(0, 0)}>
                  Update Student
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main className="container my-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;