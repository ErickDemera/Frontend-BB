import { Layout } from "@/components/layout";
import React, { useState } from "react"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ListaProductos from "../../../components/simulador/productos/ListaProductos";

export default function Index() {
  return (
    <Layou>
      <ListaProductos />
    </Layou>
  );
}
