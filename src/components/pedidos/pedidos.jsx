import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Button,
  Card,
  DatePicker,
  Select,
  Table
} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import './tabla.css'

export const Pedidos = props => {
  const {
    onFinish,
    dataPedidos,
    columnasPedidos,
    toggleDetalle,
    enviarDatosModalEditarPedidos
  } = props

  const { Option } = Select
  const { RangePicker } = DatePicker

  return (
    <div>
      <Card title='ORDEN DE PEDIDO' style={{ maxHeight: '165px' }}>
        <Form
          name='basic'
          onFinish={onFinish}
          layout='vertical '
          fields={[{ name: 'tipo', value: 'nombre' }]}
        >
          <Row gutter={16}>
            <Col className='gutter-row' span={4}>
              <Form.Item name='tipo' label='Buscar por:'>
                <Radio.Group>
                  <Radio value='nombre'>Nombre</Radio>
                  <Radio value='documento'>Documento</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={6}>
              <Form.Item label='Buscar:' name='buscar'>
                <Input
                  size='short'
                  autoComplete='off'
                  prefix={<EditOutlined />}
                />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={6}>
              <Form.Item label='Fecha Inicial - Fecha Final' name='fechas'>
                <RangePicker />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={4}>
              <Form.Item label='Estado' name='estado'>
                <Select placeholder='Seleccione...'>
                  <Option>Ninguno</Option>
                  <Option key='Facturado'>Facturado</Option>
                  <Option key='Pendiente'>Pendiente</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={4}>
              <Form.Item>
                <Button
                  style={{ background: '#febb48', marginTop: '30px' }}
                  block
                  type='primary'
                  htmlType='submit'
                >
                  Buscar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row>
        <Col span={24}>
          <Table
            className='tabla-pedidos'
            columns={columnasPedidos}
            dataSource={dataPedidos}
            onRow={(record, rowIndex) => {
              return {
                // click row
                onDoubleClick: event => {
                  enviarDatosModalEditarPedidos(record)
                  toggleDetalle()
                  // cargarTablaDetalle(record)
                } // double click row
                // mouse leave row
              }
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
