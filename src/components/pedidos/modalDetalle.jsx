import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Modal,
  Table,
  Button,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Typography,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./tabla.css";
const { Title, Text } = Typography;
const { Option } = Select;
export const ModalDetalle = (props) => {
  const [total, setTotal] = useState(0);
  const [totalArt, setTotalArt] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [valor, setValor] = useState(0);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descuento, setDescuento] = useState("");
  const {
    consultarArticuloCodigo,
    visibleDetalle,
    toggleDetalle,
    seleccionarArticulo,
    onSearch,
    agregarItem,
    dataPedidoEditar,
    actualizarDataPedido,
    columnasPedidosModaldetalle,
    dataModalEditar,
    eliminarLinea,
    datosArticulo,
    productosData,
    calcularDescuento,
  } = props;

  const refCodigo = useRef(null);
  const refDescripcion = useRef(null);
  const refCantidad = useRef(null);
  const refValor = useRef(null);

  useEffect(() => {
    refCodigo.current.select();
  }, []);

  useEffect(() => {
    let t = 0;
    dataModalEditar.forEach((articulo) => {
      t = t + articulo.Total;
    });
    setTotal(t);
  });

  useEffect(() => {
    if (datosArticulo) {
      setValor(datosArticulo.PriceList1);
      setCantidad(1);
    }
  }, [datosArticulo]);

  useEffect(() => {
    if (dataPedidoEditar) {
      setDireccion(dataPedidoEditar.Address);
      setTelefono(
        dataPedidoEditar.Phone !== undefined
          ? dataPedidoEditar.Phone.Number
          : ""
      );
    }
  }, [dataPedidoEditar]);

  const onChangeDescuento = (e) => {
    setDescuento(e);
  };

  const onClickCalcular = () => {
    calcularDescuento(descuento);
  };

  const onPressEnter = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    switch (e.target.id) {
      case "codigo":
        const resp = await consultarArticuloCodigo(value);
        if (resp === true) refCantidad.current.select();
        else refCodigo.current.select();
        break;
      case "cantidad":
        if (value) refValor.current.select();
        break;
      case "valorUnitario":
        if (total && totalArt > 0) {
          const respItem = await agregarItem(valor, cantidad, totalArt);
          if (respItem) {
            setTotalArt(0);
            refCodigo.current.select();
          }
        }
        break;
      default:
        break;
    }
  };

  const facturar = () => {
    actualizarDataPedido(true, direccion, telefono);
  };

  const guardar = () => {
    actualizarDataPedido(false, direccion, telefono);
  };

  const onValuesChange = (e) => {
    let t = 0;
    if (e.cantidad) {
      setCantidad(e.cantidad);
      t = e.cantidad * valor;
    } else if (e.valorUnitario) {
      setValor(e.valorUnitario);
      t = e.valorUnitario * cantidad;
    } else if (e.descripcion) {
      if (seleccionarArticulo(e.descripcion)) {
        refCantidad.current.select();
      }
    } else if (e.direccion) {
      setDireccion(e.direccion);
    } else if (e.telefono) {
      setTelefono(e.telefono);
    }

    if (t > 0) {
      setTotalArt(t);
    }
  };

  const handleCancel = () => {
    toggleDetalle();
  };

  return (
    <>
      <Modal
        style={{ width: "800px" }}
        title="Editar Orden"
        style={{ top: 20 }}
        visible={visibleDetalle}
        onOk={() => toggleDetalle()}
        onCancel={() => toggleDetalle()}
        width={1000}
        footer={null}
      >
        <Form
          layout="vertical"
          fields={
            datosArticulo
              ? [
                  { name: "valorUnitario", value: valor },
                  {
                    name: "descripcion",
                    value: datosArticulo.Description,
                  },
                  {
                    name: "cantidad",
                    value: cantidad,
                  },
                ]
              : [
                  { name: "valorUnitario", value: 0 },
                  {
                    name: "descripcion",
                    value: "",
                  },
                  {
                    name: "cantidad",
                    value: 1,
                  },
                  {
                    name: "total",
                    value: 0,
                  },
                  {
                    name: "direccion",
                    value: direccion,
                  },
                  {
                    name: "telefono",
                    value: telefono,
                  },
                ]
          }
          onValuesChange={onValuesChange}
        >
          <Row gutter={16}>
            <Col
              className="gutter-row"
              span={4}
              style={{ marginBottom: "10px" }}
            >
              <Title level={4}>Documento</Title>
              <Text>{dataPedidoEditar.Identification}</Text>
            </Col>
            <Col
              className="gutter-row"
              span={7}
              style={{ marginBottom: "10px" }}
            >
              <Title level={4}>Nombres</Title>
              <Text> {dataPedidoEditar.FullName}</Text>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Direccion:" name="direccion">
                <Input
                  onPressEnter={onPressEnter}
                  size="middle"
                  prefix={<EditOutlined />}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <Form.Item label="Teléfono:" name="telefono">
                <Input
                  onPressEnter={onPressEnter}
                  size="middle"
                  prefix={<EditOutlined />}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={2}>
              <Form.Item label="Días:" name="diascredito">
                <Text>{dataPedidoEditar.DiasCredito}</Text>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <Form.Item label="Código:" name="codigo">
                <Input
                  onPressEnter={onPressEnter}
                  ref={refCodigo}
                  size="short"
                  autoComplete="off"
                  prefix={<EditOutlined />}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <Form.Item label="Descripción:" name="descripcion">
                <Select
                  ref={refDescripcion}
                  showSearch
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {productosData &&
                    productosData.map((datos, i) => {
                      return <Option key={i}>{datos.Description}</Option>;
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <Form.Item label="Cantidad:" name="cantidad">
                <InputNumber
                  min={1}
                  onPressEnter={onPressEnter}
                  size="short"
                  autoComplete="off"
                  ref={refCantidad}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <Form.Item label="Valor Unitario:" name="valorUnitario">
                <InputNumber
                  size="short"
                  autoComplete="off"
                  ref={refValor}
                  onPressEnter={onPressEnter}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <Form.Item label="Total" name="total">
                <Text>$ {totalArt}</Text>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Table
                className="tabla-pedidos"
                columns={columnasPedidosModaldetalle}
                dataSource={dataModalEditar}
                onRow={(record, i) => {
                  return {
                    onDoubleClick: () => {
                      eliminarLinea(record, i);
                    },
                  };
                }}
              />
            </Col>
            <Col className="gutter-row" span={9} offset={15}>
              <Text mark>
                * Doble 'Click' sobre el producto que desea eliminar o editar*
              </Text>
            </Col>
            <Col className="gutter-row" span={10}>
              <Title level={3}>
                Total Pedido
                <Alert
                  message={"$ " + total}
                  type="info"
                  style={{ maxWidth: "180px" }}
                />{" "}
              </Title>
            </Col>
            <Col className="gutter-row" span={14}>
              <Title level={3}>DESCUENTO %</Title>
              <InputNumber
                style={{ width: "10%", margin: "auto" }}
                min={1}
                onChange={onChangeDescuento}
                value={descuento}
              />
              <Button danger type="primary" onClick={onClickCalcular}>
                CALCULAR
              </Button>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item>
                <Button htmlType="submit" onClick={guardar}>
                  Guardar
                </Button>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item>
                <Button htmlType="submit" onClick={facturar}>
                  Facturar
                </Button>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Button onClick={handleCancel}>Cancelar</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
