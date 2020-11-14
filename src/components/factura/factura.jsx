import React, { useState, useEffect, useRef } from 'react'
import {
  Alert,
  Modal,
  Table,
  Button,
  Form,
  Input,
  Row,
  Col,
  message,
  InputNumber,
  Typography,
  Select
} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import '../pedidos/tabla.css'
const { Option } = Select
export const Factura = props => {
  const [total, setTotal] = useState(0)
  const [totalArt, setTotalArt] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [valor, setValor] = useState(0)
  const {
    consultarClienteCodigo,
    dataTablaProducto,
    columnasDataFactura,
    consultarArticuloCodigo,
    eliminarItemFactura,
    agregarItemFactura,
    productosData,
    nombresData,
    actualizarDataPedido,
    seleccionarArticulo,
    onSearchNombres,
    onSearchDescripcion,
    datosCliente,
    datosArticulo
  } = props

  const refDocumento = useRef(null)
  const refNombres = useRef(null)
  const refCodigo = useRef(null)
  const refDescripcion = useRef(null)
  const refCantidad = useRef(null)
  const refValor = useRef(null)
  useEffect(() => {
    refDocumento.current.select()
  }, [])

  const onPressEnter = async e => {
    e.preventDefault()
    const value = e.target.value
    switch (e.target.id) {
      case 'codigo':
        const resp = await consultarArticuloCodigo(value)
        if (resp === true) refCantidad.current.select()
        else refCodigo.current.select()
        break
      case 'cantidad':
        if (value) refValor.current.select()
        break
      case 'valorUnitario':
        const respItem = await agregarItemFactura(valor, cantidad, totalArt)
        if (respItem) {
          setTotalArt(0)
          refCodigo.current.select()
        }
        break
      case 'documento':
        const respItem2 = await consultarClienteCodigo(value)
        if (respItem2) {
          setTotalArt(0)
          refCodigo.current.select()
        }
        break

      default:
        break
    }
  }

  const facturar = () => {
    actualizarDataPedido(true)
  }

  const guardar = () => {
    actualizarDataPedido(false)
  }

  const onValuesChange = e => {
    let t = 0
    if (e.cantidad) {
      setCantidad(e.cantidad)
      t = e.cantidad * valor
    } else if (e.valorUnitario) {
      setValor(e.valorUnitario)
      t = e.valorUnitario * cantidad
    } else if (e.descripcion) {
      if (seleccionarArticulo(e.descripcion)) {
        refCantidad.current.select()
      }
    }

    if (t > 0) {
      setTotalArt(t)
    }
  }

  const handleCancel = e => {
    e.preventDefault()
    console.log('cancelo')
  }

  const { Title, Text } = Typography
  return (
    <div>
      <Form
        layout='vertical '
        style={{ paddingTop: '20px' }}
        onValuesChange={onValuesChange}
        fields={[
          {
            name: 'documento',
            value: datosCliente && datosCliente.Identification
          },
          { name: 'nombres', value: datosCliente && datosCliente.FullName },
          { name: 'codigo', value: datosArticulo && datosArticulo.Code },
          {
            name: 'descripcion',
            value: datosArticulo && datosArticulo.Description
          }
        ]}
      >
        <Row gutter={16}>
          <Col className='gutter-row' span={4}>
            <Form.Item label='Documento:' name='documento'>
              <Input
                onPressEnter={onPressEnter}
                size='middle'
                prefix={<EditOutlined />}
                autoComplete='off'
                ref={refDocumento}
              />
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={8}>
            <Form.Item label='Nombre completo:' name='nombres'>
              <Select
                ref={refNombres}
                showSearch
                onSearch={onSearchNombres}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {nombresData &&
                  nombresData.map((datos, i) => {
                    return <Option key={i}>{datos.FullName}</Option>
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={12}></Col>
          <Col className='gutter-row' span={3}>
            <Form.Item label='Código:' name='codigo'>
              <Input
                ref={refCodigo}
                onPressEnter={onPressEnter}
                size='middle'
                autoComplete='off'
                prefix={<EditOutlined />}
              />
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={10}>
            <Form.Item label='Descripcion:' name='descripcion'>
              <Select
                ref={refDescripcion}
                style={{ width: '100%' }}
                size='middle'
                showSearch
                onSearch={onSearchDescripcion}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {productosData &&
                  productosData.map((datos, i) => {
                    return <Option key={i}>{datos.Description}</Option>
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={3}>
            <Form.Item label='Cantidad:' name='cantidad'>
              <InputNumber
                min={1}
                ref={refCantidad}
                size='short'
                autoComplete='off'
                onPressEnter={onPressEnter}
              />
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={3}>
            <Form.Item label='Valor U.' name='valorUnitario'>
              <InputNumber
                size='short'
                autoComplete='off'
                onPressEnter={onPressEnter}
                ref={refValor}
              />
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={3}>
            <Form.Item label='Total' name='total'>
              <Text>$ {totalArt}</Text>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' span={24}>
            <Table
              className='tabla-pedidos'
              columns={columnasDataFactura}
              dataSource={dataTablaProducto}
              onRow={record => {
                return {
                  onDoubleClick: () => {
                    eliminarItemFactura(record)
                  }
                }
              }}
            />
          </Col>
          <Col className='gutter-row' span={9} offset={15}>
            <Text mark>
              * Doble 'Click' sobre el producto que desea eliminar *
            </Text>
          </Col>
          <Col className='gutter-row' span={24}>
            <Title level={3}>
              Total Pedido
              <Alert
                message={'$ ' + total}
                type='info'
                style={{ maxWidth: '180px' }}
              />
            </Title>
          </Col>
          <Col className='gutter-row' span={8}>
            <Form.Item>
              <Button htmlType='submit' onClick={guardar}>
                Guardar
              </Button>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={8}>
            <Form.Item>
              <Button htmlType='submit' onClick={facturar}>
                Facturar
              </Button>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={8}>
            <Button onClick={handleCancel}>Cancelar</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
