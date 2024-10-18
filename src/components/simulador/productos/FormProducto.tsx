import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface FormValues {
  nombre: string;
  precio: number;
}

export const FormProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="text-dark">
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduce tu nombre"
          {...register("nombre", { required: "El nombre es obligatorio" })}
          isInvalid={!!errors.nombre}
        />
        {/* Muestra mensaje de error */}
        {errors.nombre && (
          <Form.Control.Feedback type="invalid">
            {errors.nombre.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="formPrecio">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduce tu nombre"
          {...register("precio", { required: "El precio es obligatorio" })}
          isInvalid={!!errors.precio}
        />
        {/* Muestra mensaje de error */}
        {errors.precio && (
          <Form.Control.Feedback type="invalid">
            {errors.precio.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Cambiado de botón a enlace */}
      <button // Usamos un botón HTML para que tenga el mismo estilo
        type="submit"
        style={{
          display: "block",
          margin: "0 auto",
          backgroundColor: "#229fa5",
          borderColor: "#229fa5",
          color: "white", // Color del texto
          padding: "0.375rem 0.75rem", // Padding para el botón
          borderRadius: "0.25rem", // Bordes redondeados
          border: "none", // Sin borde
          cursor: "pointer", // Cursor de puntero al pasar sobre el botón
        }}
      >
        Iniciar sesión
      </button>
    </Form>
  );
};
