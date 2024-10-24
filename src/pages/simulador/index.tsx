import { Layout } from "@/components/layout";
import React, { useState } from "react";
import ListaProductos from "../../components/simulador/productos/ListaProductos";

export default function Index() {
  return (
    <Layout>
      <ListaProductos />
    </Layout>
  );
}
