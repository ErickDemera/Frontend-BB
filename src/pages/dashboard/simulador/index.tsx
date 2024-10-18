import { Layout } from "@/components/layout";
import React, { useState } from "react";
import {
  Table,
  Button,
  FormControl,
  InputGroup,
  Col,
  Row,
  Card,
  Container,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ListaProductos from "../../../components/simulador/productos/ListaProductos";

export default function Index() {
  return (
    <Layout>
      <ListaProductos />
    </Layout>
  );
}
