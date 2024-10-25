import React, { useState } from "react";
import {
  Table,
  Button,
  FormControl,
  InputGroup,
  Col,
  Row,
  Card,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListaTerms = () => {
  const [terms, setTerms] = useState([
    { id: 1, producto: "Producto A", plazo: "1 - 29" },
    { id: 2, producto: "Producto B", plazo: "30 - 60" },
    { id: 3, producto: "Producto C", plazo: "61 - 90" },
    { id: 4, producto: "Producto D", plazo: "91 - 120" },
    { id: 5, producto: "Producto E", plazo: "121 - 180" },
    { id: 6, producto: "Producto F", plazo: "181 - 360" },
    { id: 7, producto: "Producto G", plazo: "> 361" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTerm, setNewTerm] = useState({ producto: "", plazo: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [termToDelete, setTermToDelete] = useState(null);
  const [editingTerm, setEditingTerm] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTerm({ producto: "", plazo: "" });
    setEditingTerm(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTerm) {
      setTerms((prevTerms) =>
        prevTerms.map((term) =>
          term.id === editingTerm.id ? { ...term, ...newTerm } : term
        )
      );
    } else {
      const newId = terms.length ? terms[terms.length - 1].id + 1 : 1;
      setTerms([...terms, { id: newId, ...newTerm }]);
    }
    handleCloseModal();
  };

  const handleEdit = (term) => {
    setNewTerm({ producto: term.producto, plazo: term.plazo });
    setEditingTerm(term);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setTermToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTermToDelete(null);
  };

  const handleDelete = () => {
    setTerms(terms.filter((term) => term.id !== termToDelete));
    handleCloseConfirmModal();
  };

  return (
    <div className="container-fluid bg-secondary p-4">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            style={{
              backgroundColor: "#1ED760",
              color: "white",
              border: "none",
            }}
            className="me-4"
            onClick={handleShowModal}
          >
            + Agregar Plazo
          </Button>
        </div>
        <h2>Listado de Plazos</h2>
        <div>
          
        </div>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover className="d-none d-xxs-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Plazo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {terms
            .filter((term) =>
              term.producto.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((term) => (
              <tr key={term.id}>
                <td>{term.id}</td>
                <td>{term.producto}</td>
                <td>{term.plazo}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-3"
                    onClick={() => handleEdit(term)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowConfirmModal(term.id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Container className="d-xxs-none">
        <div
          className="overflow-auto bg-light"
          style={{
            maxHeight: "400px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <Row>
            {terms
              .filter((term) =>
                term.producto.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((term) => (
                <Col md={4} key={term.id} sm={6} xs={12} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{term.producto}</Card.Title>
                      <Card.Text>Plazo: {term.plazo}</Card.Text>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(term)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowConfirmModal(term.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </Container>

      {/* Modal para agregar/editar term */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTerm ? "Editar Plazo" : "Detalles del Nuevo Plazo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProducto">
              <Form.Label>Producto</Form.Label>
              <Form.Control
                as="select"
                className="w-100 mb-3"
                name="producto"
                value={newTerm.producto}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un producto</option>
                <option value="Producto A">Producto A</option>
                <option value="Producto B">Producto B</option>
                <option value="Producto C">Producto C</option>
                <option value="Producto D">Producto D</option>
                <option value="Producto E">Producto E</option>
                <option value="Producto F">Producto F</option>
                <option value="Producto G">Producto G</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPlazo">
              <Form.Label>Plazo</Form.Label>
              <Form.Control
                as="select"
                className="w-100 mb-3"
                name="plazo"
                value={newTerm.plazo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un plazo</option>
                <option value="1 - 29">1 - 29</option>
                <option value="30 - 60">30 - 60</option>
                <option value="61 - 90">61 - 90</option>
                <option value="91 - 120">91 - 120</option>
                <option value="121 - 180">121 - 180</option>
                <option value="181 - 360">181 - 360</option>
                <option value="> 361">> 361</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {editingTerm ? "Guardar Cambios" : "¡Plazo Agregado!"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar este plazo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
