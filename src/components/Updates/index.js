import React, { Fragment, useContext, useState } from "react";
import { Typography, Row, Col, Button, message } from "antd";
import { ShoppingCartOutlined, TeamOutlined } from "@ant-design/icons";
import { DataContext } from "../context/context";
const { Title } = Typography;

function Updates() {
  const [spinProducts, setSpinProducts] = useState(false);
  const [spinClients, setSpinClients] = useState(false);

  const { consultarClients, consultarProducts } = useContext(DataContext);

  const onClickProducts = async () => {
    setSpinProducts(true);
    const resp = await consultarProducts();
    if (resp === false) {
      setSpinProducts(resp);
      message.success("Artículos Actualizados Correctamente");
    }
  };

  const onClickClients = async () => {
    setSpinClients(true);
    const resp = await consultarClients();
    setSpinClients(false);

    message.success("Clientes Actualizados Correctamente");
  };

  return (
    <Fragment>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <Title>Actualizaciones</Title>
        </Col>
      </Row>
      <Row gutter={16} justify="center">
        <Col span={12}>
          <Title level={4}>Actualizar Artículos</Title>
          <Button
            onClick={onClickProducts}
            type="primary"
            style={{ background: "#febb48", width: "auto", height: "auto" }}
            icon={
              <ShoppingCartOutlined
                spin={spinProducts}
                style={{ fontSize: "100px", margin: "10px" }}
              />
            }
          />
        </Col>
        <Col span={12}>
          <Title level={4}>Actualizar Clientes</Title>
          <Button
            onClick={onClickClients}
            type="primary"
            icon={
              <TeamOutlined
                style={{ fontSize: "100px", margin: "10px" }}
                spin={spinClients}
              />
            }
            style={{ background: "#febb48", width: "auto", height: "auto" }}
          />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Updates;
