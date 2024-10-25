import React, { useEffect, useState } from "react";
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

export const ListaProductos = () => {
  const [products, setProducts] = useState([  
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct({ name: "", description: "" });
    setEditingProduct(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...newProduct }
            : product
        )
      );
    } else {
      const newId = products.length ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, { id: newId, ...newProduct }]);
    }
    handleCloseModal();
  };

  const handleEdit = (product) => {
    setNewProduct({ name: product.name, description: product.description });
    setEditingProduct(product);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setProductToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setProductToDelete(null);
  };

  const handleDelete = () => {
    setProducts(products.filter((product) => product.id !== productToDelete));
    handleCloseConfirmModal();
  };

  useEffect((() => {
    fetch('https://i2vdxg7l3l.execute-api.us-east-1.amazonaws.com/dev/productos', {
      method: "GET",
    }).then((data) => {
      return data.json();
    }).then((result) => {
      console.log(result);
    setProducts(result);      
    });
  }), []);

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
            + Agregar Producto
          </Button>
        </div>
        <h2>Listado de Productos</h2>
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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products
           // .filter((product) =>
           ///   product.ca_nombre.toLowerCase().includes(searchTerm.toLowerCase())
//)
            .map((product) => (
              <tr key={product.ca_catalogoid}>
                <td>{product.ca_catalogoid}</td>
                <td>{product.ca_nombre}</td>
                <td>{product.ca_validacion_ingreso_tasa}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-3"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowConfirmModal(product.ca_catalogoid)}
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
            {products
              .filter((product) =>
                product.ca_nombre.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <Col md={4} key={product.ca_catalogoid} sm={6} xs={12} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{product.ca_nombre}</Card.Title>
                      <Card.Text>Id: {product.ca_catalogoid}</Card.Text>
                      <Card.Text>Descripción: {product.ca_nombre}</Card.Text>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowConfirmModal(product.id)}
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

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Editar Producto" : "Detalles del Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                className="w-100 mb-3"
                type="text"
                placeholder="Ingrese el nombre del producto"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción del Producto</Form.Label>
              <Form.Control
                className="w-100 mb-3"
                type="text"
                placeholder="Ingrese la descripción"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingProduct ? "Guardar Cambios" : "¡Producto Agregado!"}
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
          ¿Estás seguro de que quieres eliminar este producto?
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
