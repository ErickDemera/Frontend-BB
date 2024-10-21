import { Form, Button, ToggleButton, ToggleButtonGroup, Row, Col, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";


interface FormValues {
  tipoBusqueda: string;
  periodoConsulta: string;
  beneficiariosRot: string;
  grupoEconomico: string;
  seleccionEmpresas: string[];
}

export const FormProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-3 text-dark" style={{ border: "1px solid #ddd", borderRadius: "10px" }}>
      <Row>
        <Col md={6}>
          {/* Tipo de búsqueda */}
          <Form.Group controlId="formTipoBusqueda">
            <Form.Label>Tipo de Búsqueda:</Form.Label>
            <ToggleButtonGroup
              type="radio"
              name="tipoBusqueda"
              defaultValue="individual"
              className="gb-primary d-flex mb-2 " // Añadido para que los botones se muestren juntos
            >
              <ToggleButton
                value="individual"
                variant="outline-info"
                {...register("tipoBusqueda", { required: "Seleccione un tipo de búsqueda" })}
              >
                Cliente Individual
              </ToggleButton>
              <ToggleButton
                value="grupo"
                variant="outline-info"
                {...register("tipoBusqueda", { required: "Seleccione un tipo de búsqueda" })}
              >
                Grupo Económico
              </ToggleButton>
            </ToggleButtonGroup>
            {errors.tipoBusqueda && <span className="text-danger">{errors.tipoBusqueda.message}</span>}
          </Form.Group>

          {/* Periodo de Consulta */}
          <Form.Group controlId="formPeriodoConsulta">
            <Form.Label>Periodo de Consulta</Form.Label>
            <ToggleButtonGroup
              type="radio"
              name="periodoConsulta"
              defaultValue="actual"
              className="d-flex mb-2"
            >
              <ToggleButton
                value="actual"
                variant="outline-info"
                {...register("periodoConsulta", { required: "Seleccione un periodo de consulta" })}
              >
                Corte Actual
              </ToggleButton>
              <ToggleButton
                value="calendario"
                variant="outline-info"
                {...register("periodoConsulta", { required: "Seleccione un periodo de consulta" })}
              >
                Año Calendario
              </ToggleButton>
            </ToggleButtonGroup>
            {errors.periodoConsulta && <span className="text-danger">{errors.periodoConsulta.message}</span>}
          </Form.Group>

          {/* Beneficiarios Rot */}
          <Form.Group controlId="formBeneficiariosRot">
            <Form.Label>Beneficiarios Rot</Form.Label>
            <ToggleButtonGroup
              type="radio"
              name="beneficiariosRot"
              defaultValue="yes"
              className="d-flex mb-2"
            >
              <ToggleButton
                value="yes"
                variant="outline-info"
                {...register("beneficiariosRot", { required: "Seleccione una opción" })}
              >
                Yes
              </ToggleButton>
              <ToggleButton
                value="no"
                variant="outline-info"
                {...register("beneficiariosRot", { required: "Seleccione una opción" })}
              >
                No
              </ToggleButton>
            </ToggleButtonGroup>
            {errors.beneficiariosRot && <span className="text-danger">{errors.beneficiariosRot.message}</span>}
          </Form.Group>
        </Col>

        <Col md={6}>
          {/* Cliente / Grupo Económico */}
          <Form.Group controlId="formGrupoEconomico">
            <Form.Label>Cliente / Grupo Económico</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese ID o nombre de empresa"
              {...register("grupoEconomico", { required: "Este campo es obligatorio" })}
              isInvalid={!!errors.grupoEconomico}
            />
            <Form.Control.Feedback type="invalid">
              {errors.grupoEconomico && errors.grupoEconomico.message}
            </Form.Control.Feedback>
            
            <Dropdown className="mt-2">
              <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                Seleccionar Empresa
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Empresa 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Empresa 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Empresa 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {/* Seleccionar Empresas */}
          <Form.Group controlId="formSeleccionEmpresas">
            <Form.Label>Seleccionar Empresas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar empresas"
              {...register("seleccionEmpresas", { required: "Este campo es obligatorio" })}
            />
            <div className="mt-2">
              <Form.Check label="Empresa 7" value="empresa7" {...register("seleccionEmpresas")} />
              <Form.Check label="Empresa 8" value="empresa8" {...register("seleccionEmpresas")} />
              <Form.Check label="Empresa 9" value="empresa9" {...register("seleccionEmpresas")} />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Botón Generar */}
      <div className="d-flex justify-content-end mt-3">
        <Button type="submit" style={{ backgroundColor: "#229fa5", borderColor: "#229fa5", width: "auto" }}>
          Generar
        </Button>
      </div>
    </Form>
  );
};
