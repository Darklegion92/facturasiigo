import React from "react";
import { Modal, Typography, Row, Col } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import "./styles.css";

const { Title, Text } = Typography;

const Alerta = ({ modal, setModal }) => {
  return (
    <Modal
      closable={false}
      centered
      visible={modal.visible}
      destroyOnClose={true}
      title={
        <Title level={3} style={{ color: "var(--color-primario)" }}>
          {modal.titulo} 
        </Title>
      }
      footer={
        <a
          onClick={() => {
            if (modal.link === "") {
              setModal({ visible: false });
            }
          }}
          style={{
            border: "solid 1px black",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: modal.colorFondoBtn,
            color: modal.colorText,
            margin: "10px",
          }}
        >
          ACEPTAR
        </a>
      }
    >
      <Row gutter={16} align="middle" justify="center">
        <Col span={8}>
          {modal.tipo === "SUCCESS" ? (
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{ width: "100%", fontSize: "100px", margin: "10px" }}
            />
          ) : modal.tipo === "ERROR" ? (
            <CloseCircleOutlined
              style={{
                width: "100%",
                fontSize: "100px",
                margin: "10px",
                color: "#fa0202",
              }}
            />
          ) : (
            <WarningOutlined
              style={{
                width: "100%",
                fontSize: "100px",
                margin: "10px",
                color: "#faab02",
              }}
            />
          )}
        </Col>
        <Col span={16}>
          <Text style={{ color: "var(--color-primario)", fontSize: "20px" }}>
            {modal.mensaje}
          </Text>
        </Col>
      </Row>
    </Modal>
  );
};

export default Alerta;
