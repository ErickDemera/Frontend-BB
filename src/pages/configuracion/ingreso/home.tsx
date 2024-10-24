import { FormProducto } from "@/components/simulador/productos/FormProducto";
import { Layout } from "../../../components/layout/index";
import { ListaProductos } from "../../../components/simulador/productos/ListaProductos";

export default function Home() {
  return (
    <Layout>
      <FormProducto />
    </Layout>
  );
}
