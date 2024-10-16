import { Col, Container, Row } from "react-bootstrap";
import { LoginForm } from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <Container
      fluid
      className="vh-100 bg-primary d-flex align-items-center justify-content-center"
    >
      <Row className="w-100">
        {/* Columna vacía para darle espacio al diseño */}
        <Col lg={4}></Col>
        {/* Columna central con el formulario */}
        <Col
          lg={4}
          className="text-white p-5 text-dark"
          style={{ backgroundColor: "#fff", padding: "20px" }}
        >
          <div className="text-center mb-4">
            <img src="/icon-bb.svg" alt="" className="navbar-icon-login" />
          </div>
          <h2 className="text-center  mb-4 text-dark">Iniciar Sesión</h2>
          <h6 className="text-center mb-4 text-dark">
            BIENVENIDO A LA APLICACION
          </h6>
          <LoginForm />
        </Col>
        {/* Columna vacía para mantener el balance del diseño */}
        <Col lg={4}></Col>
      </Row>
    </Container>
  );
};
export default Login;
