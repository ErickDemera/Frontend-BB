import { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  productos: string;
  segmentos: string;
  cliente: string;
  saldoPromedio: number;
  numeroTrx: number;
  plazoReajuste: string;
  plazoContingentes: number;
  tasaIngresada: number;
  tarifaServicio: number;
}

export const RentabilidadForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [accion, setAccion] = useState<string>("");
  const [dataList, setDataList] = useState<FormValues[]>([]);

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setDataList([...dataList, { ...data, accion }]);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-3" style={{ border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="productos">
              <Form.Label>Productos</Form.Label>
              <Form.Control as="select" {...register("productos", { required: "Campo obligatorio" })}>
                <option value="">Seleccione</option>
                <option value="Cartera Comercial">Cartera Comercial</option>
                <option value="ATC">ATC</option>
                <option value="Ahorros">Ahorros</option>
                <option value="Monetarios">Monetarios</option>
              </Form.Control>
              {errors.productos && <span className="text-danger">{errors.productos.message}</span>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="segmentos">
              <Form.Label>Segmentos</Form.Label>
              <Form.Control as="select" {...register("segmentos", { required: "Campo obligatorio" })}>
                <option value="">Seleccione</option>
                <option value="Corporativo">Corporativo</option>
                <option value="Empresarial">Empresarial</option>
                <option value="Pymes">Pymes</option>
                <option value="No aplica">No aplica</option>
              </Form.Control>
              {errors.segmentos && <span className="text-danger">{errors.segmentos.message}</span>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="cliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control as="select" {...register("cliente", { required: "Campo obligatorio" })}>
                <option value="Empresa 1">Empresa 1</option>
                <option value="Empresa 2">Empresa 2</option>
                <option value="Empresa 3">Empresa 3</option>
                <option value="Empresa 4">Empresa 4</option>
              </Form.Control>
              {errors.cliente && <span className="text-danger">{errors.cliente.message}</span>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="saldoPromedio">
              <Form.Label>Saldo Promedio</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese saldo promedio" 
                {...register("saldoPromedio", { required: "Campo obligatorio" })} 
              />
              {errors.saldoPromedio && <span className="text-danger">{errors.saldoPromedio.message}</span>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="numeroTrx">
              <Form.Label>Número Trx</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese número de transacciones" 
                {...register("numeroTrx", { required: "Campo obligatorio" })} 
              />
              {errors.numeroTrx && <span className="text-danger">{errors.numeroTrx.message}</span>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="plazoReajuste">
              <Form.Label>Plazo Reajuste</Form.Label>
              <Form.Control as="select" {...register("plazoReajuste", { required: "Campo obligatorio" })}>
                <option value="">Seleccione</option>
                <option value="1-29">1-29</option>
                <option value="30-60">30-60</option>
                <option value="61-90">61-90</option>
                <option value="No aplica">No aplica</option>
              </Form.Control>
              {errors.plazoReajuste && <span className="text-danger">{errors.plazoReajuste.message}</span>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="plazoContingentes">
              <Form.Label>Plazo Contingentes</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese plazo contingentes" 
                {...register("plazoContingentes", { required: "Campo obligatorio" })} 
              />
              {errors.plazoContingentes && <span className="text-danger">{errors.plazoContingentes.message}</span>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="tasaIngresada">
              <Form.Label>Tasa Ingresada</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese tasa" 
                {...register("tasaIngresada", { required: "Campo obligatorio" })} 
              />
              {errors.tasaIngresada && <span className="text-danger">{errors.tasaIngresada.message}</span>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="tarifaServicio">
              <Form.Label>Tarifa Servicio</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese tarifa de servicio" 
                {...register("tarifaServicio", { required: "Campo obligatorio" })} 
              />
              {errors.tarifaServicio && <span className="text-danger">{errors.tarifaServicio.message}</span>}
            </Form.Group>
          </Col>
        </Row>

        {/* Botón de acción */}
        <Row className="mt-4">
          <Col className="d-flex justify-content-end">
            <Button type="submit" style={{ backgroundColor: "#229fa5", borderColor: "#229fa5" }}>
              Agregar
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Tabla para mostrar los datos ingresados */}
      <Table striped bordered hover className="mt-4 text-center">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Segmento</th>
            <th>Cliente</th>
            <th>Saldo Promedio</th>
            <th>Número Trx</th>
            <th>Plazo Reajuste</th>
            <th>Plazo Contingentes</th>
            <th>Tasa Ingresada</th>
            <th>Tarifa Servicio</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr key={index}>
              <td>{item.productos}</td>
              <td>{item.segmentos}</td>
              <td>{item.cliente}</td>
              <td>{item.saldoPromedio}</td>
              <td>{item.numeroTrx}</td>
              <td>{item.plazoReajuste}</td>
              <td>{item.plazoContingentes}</td>
              <td>{item.tasaIngresada}</td>
              <td>{item.tarifaServicio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
