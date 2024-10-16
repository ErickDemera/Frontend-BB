import { useState } from "react";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const router = useRouter();
  // Estado para los inputs del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías realizar validaciones o enviar los datos a un servidor
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/auth/SimuladorForm");
  };

  return (
    <Form onSubmit={handleSubmit} className="text-dark">
      <Form.Group className="mb-5" controlId="emailInput">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-5" controlId="passwordInput">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
