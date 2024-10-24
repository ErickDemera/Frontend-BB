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
    { id: 1, name: "1 - 29", min: "1", max: "29" },
    { id: 2, name: "30 - 60", min: "30", max: "60" },
    { id: 3, name: "61 - 90", min: "61", max: "90" },
    { id: 4, name: "91 - 120", min: "91", max: "120" },
    { id: 5, name: "121 - 180", min: "121", max: "180" },
    { id: 6, name: "181 - 360", min: "181", max: "360" },
    { id: 7, name: "> 361", min: "360", max: "***" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTerm, setNewTerm] = useState({ name: "", min: "", max: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [termToDelete, setTermToDelete] = useState(null);
  const [editingTerm, setEditingTerm] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTerm({ name: "", min: "", max: "" });
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
    setNewTerm({ name: term.name, min: term.min, max: term.max });
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
            + Agregar Term
          </Button>
        </div>
        <h2>Listado de Plazos</h2>
        <div>
          <Button variant="success" className="me-4">
            Importar
          </Button>
          <Button variant="danger">Exportar</Button>
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
            <th>Plazos</th>
            <th>Mínimo</th>
            <th>Máximo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {terms
            .filter((term) =>
              term.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((term) => (
              <tr key={term.id}>
                <td>{term.id}</td>
                <td>{term.name}</td>
                <td>{term.min}</td>
                <td>{term.max}</td>
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
                term.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((term) => (
                <Col md={4} key={term.id} sm={6} xs={12} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{term.name}</Card.Title>
                      <Card.Text>Mínimo: {term.min}</Card.Text>
                      <Card.Text>Máximo: {term.max}</Card.Text>
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
            {editingTerm ? "Editar Term" : "Detalles del Nuevo Term"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del Term</Form.Label>
              <Form.Control
                className="w-100 mb-3"
                type="text"
                placeholder="Ingrese el nombre del term"
                name="name"
                value={newTerm.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMinimo">
              <Form.Label>Mínimo</Form.Label>
              <Form.Control
                className="w-100 mb-3"
                type="number"
                placeholder="Ingrese el mínimo"
                name="min"
                value={newTerm.min}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMaximo">
              <Form.Label>Máximo</Form.Label>
              <Form.Control
                className="w-100 mb-3"
                type="number"
                placeholder="Ingrese el máximo"
                name="max"
                value={newTerm.max}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingTerm ? "Guardar Cambios" : "¡Term Agregado!"}
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
          ¿Estás seguro de que quieres eliminar este term?
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
