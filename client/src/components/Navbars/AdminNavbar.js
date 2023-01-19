import React, { useEffect,useCallback } from "react";
// react-bootstrap components
import { Button, Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("x-access-token");
let decoded = null;
let nom = "";
let role = "";
let id = "";
if (token != null) {
  decoded = jwt_decode(token);
    nom = decoded.userauth.nom_prenom;
    role = decoded.userauth.roles.id;
    id = decoded.userauth.id; 
  /* store.dispatch(getMessageByIdUser({id})); */
}
function AdminNavbar() {
  function LogOut(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.replace("/login");
  }
  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <Button
                className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
                variant="dark"
                onClick={() => document.body.classList.toggle("sidebar-mini")}
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
              <Button
                className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
                variant="dark"
                onClick={() =>
                  document.documentElement.classList.toggle("nav-open")
                }
              >
                <i className="fas fa-list"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
            </div>
            <Navbar.Brand
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            ></Navbar.Brand>
          </div>

          <Nav navbar>

            <Dropdown as={Nav.Item} className="dropdown-profile">
              <Dropdown.Toggle
                as={Nav.Link}
                id="dropdown-41471887333"
                variant="default"
              >
                <span className="float-left">
                  <i className="nc-icon nc-single-02"></i>
                  {nom}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                {role === 1 ? (
                  <Dropdown.Item
                    href="#"
                    onClick={(e) => window.location.replace("/settings")}
                  >
                    <i className="fas fa-users-cog"></i>
                    Settings
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                <Dropdown.Item
                  href="#"
                  onClick={(e) => window.location.replace("/profile")}
                >
                  <i className="fas fa-user"></i>
                  Profil
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item
                  className="text-danger"
                  href="#"
                  onClick={LogOut}
                >
                  <i className="nc-icon nc-button-power"></i>
                  Déconnecter
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
