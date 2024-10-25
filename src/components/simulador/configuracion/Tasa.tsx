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

export const ListaTasas = () => {
  const [tasas, setTasas] = useState([
    { id: 1, producto: "Producto A", segmento: "Segmento 1", tasa: "3%" },
    { id: 2, producto: "Producto B", segmento: "Segmento 2", tasa: "5%" },
    { id: 3, producto: "Producto C", segmento: "Segmento 3", tasa: "2.5%" },
  ]);

  const [searchBuscar, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTasa, setNewTasa] = useState({
    producto: "",
    segmento: "",
    tasa: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tasaToDelete, setTasaToDelete] = useState(null);
  const [editingTasa, setEditingTasa] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTasa({ producto: "", segmento: "", tasa: "" });
    setEditingTasa(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTasa({ ...newTasa, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTasa) {
      setTasas((prevTasas) =>
        prevTasas.map((tasaItem) =>
          tasaItem.id === editingTasa.id
            ? { ...tasaItem, ...newTasa }
            : tasaItem
        )
      );
    } else {
      const newId = tasas.length ? tasas[tasas.length - 1].id + 1 : 1;
      setTasas([...tasas, { id: newId, ...newTasa }]);
    }
    handleCloseModal();
  };

  const handleEdit = (tasaItem) => {
    setNewTasa({
      producto: tasaItem.producto,
      segmento: tasaItem.segmento,
      tasa: tasaItem.tasa.replace("%", ""),
    });
    setEditingTasa(tasaItem);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setTasaToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTasaToDelete(null);
  };

  const handleDelete = () => {
    setTasas(tasas.filter((tasaItem) => tasaItem.id !== tasaToDelete));
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
            + Agregar Tasa
          </Button>
        </div>
        <h2>Listado de Tasas</h2>
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
            <th>Tasa (%)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasas
            .filter((tasaItem) =>
              tasaItem.producto
                .toLowerCase()
                .includes(searchBuscar.toLowerCase())
            )
            .map((tasaItem) => (
              <tr key={tasaItem.id}>
                <td>{tasaItem.id}</td>
                <td>{tasaItem.producto}</td>
                <td>{tasaItem.segmento}</td>
                <td>{tasaItem.tasa}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-3"
                    onClick={() => handleEdit(tasaItem)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowConfirmModal(tasaItem.id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar tasa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTasa ? "Editar Tasa" : "Detalles de Nueva Tasa"}
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
                value={newTasa.producto}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un producto</option>
                <option value="Producto A">Producto A</option>
                <option value="Producto B">Producto B</option>
                <option value="Producto C">Producto C</option>
                <option value="Producto D">Producto D</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSegmento">
              <Form.Label>Segmento</Form.Label>
              <Form.Control
                as="select"
                className="w-100 mb-3"
                name="segmento"
                value={newTasa.segmento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un segmento</option>
                <option value="Segmento 1">Segmento 1</option>
                <option value="Segmento 2">Segmento 2</option>
                <option value="Segmento 3">Segmento 3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTasa">
              <Form.Label>Tasa(%)</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Ingrese la tasa en %"
                  name="tasa"
                  value={newTasa.tasa}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
              {editingTasa ? "Guardar Cambios" : "¡Tasa Agregada!"}
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
          ¿Estás seguro de que quieres eliminar esta tasa?
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
