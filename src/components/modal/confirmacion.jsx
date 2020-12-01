import React from "react";
import { Modal, Button, Row, Col, Divider, Form, InputNumber } from "antd";

export const Confirmacion = (props) => {
  const {
    visibleModalConfirmacion,
    toggleConfirmar,
    confirmoAccion,
    editar,
    editoDatos,
  } = props;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (value) => {
    const editado = editar;
    editado.Cantidad = value.cantidad;
    editado.PriceList1 = value.precio;
    editado.Total = value.precio * value.cantidad;
    editoDatos();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Editar y/o Eliminar"
        visible={visibleModalConfirmacion}
        onOk={null}
        footer={null}
        width={270}
        onCancel={toggleConfirmar}
      >
        <Row>
          <Col className="gutter-row" span={24}>
            <Form
              {...layout}
              name="basic"
              fields={
                editar && [
                  { name: "cantidad", value: editar.Cantidad },
                  { name: "precio", value: editar.PriceList1 },
                ]
              }
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Precio"
                name="precio"
                rules={[{ required: true, message: "Ingrese un precio!" }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Cantidad"
                name="cantidad"
                rules={[{ required: true, message: "Ingrese una cantidad!" }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button style={{ background: "#febb48" }} htmlType="submit">
                  Guardar
                </Button>
              </Form.Item>
              <Divider orientation="left">Desea eliminar ?</Divider>
              <Button type="danger" htmlType="submit" onClick={confirmoAccion}>
                Eliminar
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
