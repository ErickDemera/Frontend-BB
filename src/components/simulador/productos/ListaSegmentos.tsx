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

export const ListaSegmentos = () => {
  const [segments, setSegments] = useState([
    { id: 1, name: "Corporativo", description: "Corporativo" },
    { id: 2, name: "Empresarial", description: "Empresarial" },
    { id: 3, name: "Pymes", description: "Pymes" },
    { id: 4, name: "Alto", description: "Alto" },
    { id: 5, name: "Medio alto", description: "Medio alto" },
    { id: 6, name: "Medio", description: "Medio" },
    { id: 7, name: "Monetarios", description: "Monetarios" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newSegment, setNewSegment] = useState({ name: "", description: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [segmentToDelete, setSegmentToDelete] = useState(null);
  const [editingSegment, setEditingSegment] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewSegment({ name: "", description: "" });
    setEditingSegment(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSegment({ ...newSegment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSegment) {
      setSegments((prevSegments) =>
        prevSegments.map((segment) =>
          segment.id === editingSegment.id
            ? { ...segment, ...newSegment }
            : segment
        )
      );
    } else {
      const newId = segments.length ? segments[segments.length - 1].id + 1 : 1;
      setSegments([...segments, { id: newId, ...newSegment }]);
    }
    handleCloseModal();
  };

  const handleEdit = (segment) => {
    setNewSegment({ name: segment.name, description: segment.description });
    setEditingSegment(segment);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setSegmentToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSegmentToDelete(null);
  };

  const handleDelete = () => {
    setSegments(segments.filter((segment) => segment.id !== segmentToDelete));
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
            + Agregar Segmento
          </Button>
        </div>
        <h2>Listado de Segmentos</h2>
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
            <th>Segmento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {segments
            .filter((segment) =>
              segment.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((segment) => (
              <tr key={segment.id}>
                <td>{segment.id}</td>
                <td>{segment.name}</td>
                <td>{segment.description}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-3"
                    onClick={() => handleEdit(segment)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowConfirmModal(segment.id)}
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
            {segments
              .filter((segment) =>
                segment.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((segment) => (
                <Col md={4} key={segment.id} sm={6} xs={12} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{segment.name}</Card.Title>
                      <Card.Text>Id: {segment.id}</Card.Text>
                      <Card.Text>Descripción: {segment.description}</Card.Text>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(segment)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowConfirmModal(segment.id)}
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

      {/* Modal para agregar/editar segmento */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSegment ? "Editar Segmento" : "Detalles del Nuevo Segmento"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Producto</Form.Label>
              <Form.Control
                className="w-100 mb-3"
                type="text"
                placeholder="Ingrese el nombre del segmento"
                name="name"
                value={newSegment.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Segmento</Form.Label>
              <Form.Control
                as="select"
                className="w-100 mb-3"
                name="description"
                value={newSegment.description}
                onChange={handleChange}
                required
              >
                <option value="Corporativo">Corporativo</option>
                <option value="Empresarial">Empresarial</option>
                <option value="Pymes">Pymes</option>
                <option value="Alto">Alto</option>
                <option value="Medio alto">Medio alto</option>
                <option value="Medio">Medio</option>
                <option value="Monetarios">Monetarios</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingSegment ? "Guardar Cambios" : "Agregar Segmento"}
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
          ¿Estás seguro de que quieres eliminar este segmento?
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
