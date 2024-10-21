import Link from "next/link";
import React, { useState } from "react";
import { Navbar, Nav, Dropdown, Container, NavDropdown } from "react-bootstrap";
import {
  FcBarChart,
  FcBusinessman,
  FcCheckmark,
  FcCurrencyExchange,
  FcImport,
  FcSupport,
} from "react-icons/fc";

export const Header = () => {
  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  const handleSimuladorClick = () => {
    console.log("Simulador clickeado");
  };

  const [showCatalogoSubMenu, setShowCatalogoSubMenu] = useState(false);
  const [showConfiguracionSubMenu, setShowConfiguracionSubMenu] =
    useState(false);

  return (
    <>
      <Navbar
        variant="dark"
        className="p-2"
        style={{ backgroundColor: "#229fa5" }}
      >
        <Container fluid>
          <Navbar.Brand href="#home">
            <img src="/logo-bb.png" alt="" className="navbar-icon" />
          </Navbar.Brand>

          {/* Información del usuario */}
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="outline-light"
                id="dropdown-user"
                className="d-flex align-items-center"
              >
                <span className="me-2">Erick Demera</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#profile">
                  <FcBusinessman style={{ marginRight: "3px" }} />
                  Perfil
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <FcImport style={{ marginRight: "3px" }} />
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
      <Nav className="bg-warning nav p-1 ">
        <NavDropdown
          title={<span className="text-white font-extrabold">Seguridad</span>}
          id="nav-simulador-dropdown"
        >
          <NavDropdown.Item as={Link} href="#action/3.6">
            Información
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} href="#action/3.5">
            Información
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown
          title={<span className="text-white ">Administración</span>}
          id="nav-admin-dropdown"
          className="me-4"
        >
          {/* Catálogo con submenú */}
          <NavDropdown.Item
            as={Link}
            href="#action/3.1"
            onMouseEnter={() => setShowCatalogoSubMenu(true)}
            onMouseLeave={() => setShowCatalogoSubMenu(false)}
            className="position-relative"
          >
            <FcBarChart style={{ marginRight: "8px" }} />
            Catálogo
            {showCatalogoSubMenu && (
              <div className="sub-menu">
                <NavDropdown.Item as={Link} href="/simulador/productos">
                  <FcCheckmark style={{ marginRight: "8px" }} /> Productos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="#action/3.1.2">
                  <FcCheckmark style={{ marginRight: "8px" }} /> Segmento
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="#action/3.1.3">
                  <FcCheckmark style={{ marginRight: "8px" }} /> Plazo
                </NavDropdown.Item>
              </div>
            )}
          </NavDropdown.Item>

          {/* Configuración con submenú */}
          <NavDropdown.Item
            href="#action/3.2"
            onMouseEnter={() => setShowConfiguracionSubMenu(true)}
            onMouseLeave={() => setShowConfiguracionSubMenu(false)}
            className="position-relative"
          >
            <FcSupport style={{ marginRight: "3px" }} /> Configuración
            {showConfiguracionSubMenu && (
              <div className="sub-menu">
                <NavDropdown.Item href="#action/3.2.1">Tasa</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2.2">Pit</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2.3">
                  Provisión
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2.4">
                  Ingreso
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2.5">Costo</NavDropdown.Item>
              </div>
            )}
          </NavDropdown.Item>
        </NavDropdown>

        {/* Simulador como un botón resaltado con ícono */}
        <Nav.Link
          onClick={handleSimuladorClick}
          as={Link}
          href="/simulador/productos/home"
          className="d-flex align-items-center"
          style={{
            backgroundColor: "#ffcc00", // Color de fondo amarillo
            color: "#000", // Color de texto negro
            borderRadius: "5px", // Bordes redondeados
            padding: "5px 10px", // Padding para hacer más grande el botón
            fontWeight: "bold", // Negrita para el texto
          }}
        >
          <FcCurrencyExchange
            style={{ marginRight: "8px", fontSize: "1.5rem" }}
          />
          <span>Simulador</span>
        </Nav.Link>
      </Nav>
    </>
  );
};
