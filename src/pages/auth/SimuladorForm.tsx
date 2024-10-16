import { Layout } from "@/components/layout";
import React, { useState } from "react";
import {Table,Button,FormControl,InputGroup,Col,Row,Card,Container,} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductList = () => {
  // Datos simulados para la tabla
  const [products, setProducts] = useState([
    { id: 1, name: "ATC", description: "ATC" },
    { id: 2, name: "Cartera Comercial", description: "Cartera Comercial" },
    { id: 3, name: "Cartera Consumo", description: "Cartera Consumo" },
    { id: 4, name: "Cartera Educativa", description: "Cartera Educativa" },
    { id: 5, name: "Cartera Vivienda", description: "Cartera Vivienda" },
    { id: 6, name: "Tarjeta de Crédito", description: "Tarjeta de Crédito" },
  ]);

  // Manejo de búsqueda (puedes implementar el filtro)
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Layout>
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
          >
            + Nuevo
          </Button>
          <Button
            style={{
              backgroundColor: "#FF3040",
              color: "white",
              border: "none",
            }}
            className="me-4"
          >
            Eliminar
          </Button>
        </div>
        <div>
          <Button variant="success" className="me-4">
            Importar
          </Button>
          <Button variant="danger">Exportar</Button>
        </div>
      </div>

      {/* Búsqueda */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Tabla */}
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
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <Button variant="warning" className="me-2">
                    <FaEdit />
                  </Button>
                  <Button variant="danger">
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Container className="d-xxs-none">
        {/* Scrollable area */}
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
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <Col md={4} key={product.id} sm={6} xs={12} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Id: {product.description}</Card.Text>
                      <Card.Text>Descripción: {product.description}</Card.Text>
                      <Button variant="warning" className="me-2">
                        <FaEdit />
                      </Button>
                      <Button variant="danger">
                        <FaTrashAlt />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </div>
    </Layout>
  );
};

export default ProductList;
