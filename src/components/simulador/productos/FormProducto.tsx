import { useState } from "react";
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
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  // Estados para manejar la selección de los ToggleButtons
  const [tipoBusqueda, setTipoBusqueda] = useState<string | null>(null);
  const [periodoConsulta, setPeriodoConsulta] = useState<string | null>(null);
  const [beneficiariosRot, setBeneficiariosRot] = useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    console.log({
      tipoBusqueda,
      periodoConsulta,
      beneficiariosRot,
      ...data
    });
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
              value={tipoBusqueda}
              className="gb-primary d-flex mb-2"
              onChange={(val: string) => setTipoBusqueda(val)}
            >
              <ToggleButton
                value="individual"
                variant={tipoBusqueda === "individual" ? "info" : "outline-info"}
              >
                Cliente Individual
              </ToggleButton>
              <ToggleButton
                value="grupo"
                variant={tipoBusqueda === "grupo" ? "info" : "outline-info"}
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
              value={periodoConsulta}
              className="d-flex mb-2"
              onChange={(val: string) => setPeriodoConsulta(val)}
            >
              <ToggleButton
                value="actual"
                variant={periodoConsulta === "actual" ? "info" : "outline-info"}
              >
                Corte Actual
              </ToggleButton>
              <ToggleButton
                value="calendario"
                variant={periodoConsulta === "calendario" ? "info" : "outline-info"}
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
              value={beneficiariosRot}
              className="d-flex mb-2"
              onChange={(val: string) => setBeneficiariosRot(val)}
            >
              <ToggleButton
                value="yes"
                variant={beneficiariosRot === "yes" ? "info" : "outline-info"}
              >
                Yes
              </ToggleButton>
              <ToggleButton
                value="no"
                variant={beneficiariosRot === "no" ? "info" : "outline-info"}
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
