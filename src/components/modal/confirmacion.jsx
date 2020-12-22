import React from 'react'
import {
  Modal,
  Button,
  Row,
  Col,
  Divider,
  Form,
  InputNumber,
  Select
} from 'antd'

export const Confirmacion = props => {
  const { Option } = Select
  const {
    visibleModalConfirmacion,
    toggleConfirmar,
    confirmoAccion,
    editar,
    editoDatos,
    bodegas
  } = props

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 7, span: 15 }
  }

  const onFinish = value => {
    const editado = editar
    editado.Cantidad = value.cantidad
    editado.PriceList1 = value.precio
    const desc = value.DiscountPercentage
    if (desc) {
      editado.DiscountPercentage = desc
      editado.Total =
        value.precio * value.cantidad -
        value.precio * value.cantidad * (desc / 100)
      editado.DiscountValue = value.precio * value.cantidad * (desc / 100)
    } else {
      editado.Total = value.precio * value.cantidad - editado.DiscountValue
    }

    const bod = bodegas.filter(bodega => bodega.Id == value.bodega)
    if (bod.length > 0) {
      editado.Bodega = bod[0].Description
    }

    editoDatos()
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Modal
        title='Editar y/o Eliminar'
        visible={visibleModalConfirmacion}
        onOk={null}
        footer={null}
        width={260}
        onCancel={toggleConfirmar}
      >
        <Row>
          <Col className='gutter-row' span={24}>
            <Form
              layout='vertical'
              {...layout}
              name='basic'
              fields={
                editar && [
                  { name: 'cantidad', value: editar.Cantidad },
                  { name: 'precio', value: editar.PriceList1 },
                  { name: 'bodega', value: editar.Bodega },
                  {
                    name: 'DiscountPercentage',
                    value: editar.DiscountPercentage
                  }
                ]
              }
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                style={{ alignItems: 'center' }}
                label='Precio'
                name='precio'
                rules={[{ required: true, message: 'Ingrese un precio!' }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ alignItems: 'center' }}
                label='Cantidad'
                name='cantidad'
                rules={[{ required: true, message: 'Ingrese una cantidad!' }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ alignItems: 'center' }}
                label='Descuento'
                name='DiscountPercentage'
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ alignItems: 'center' }}
                label='Bodegas'
                name='bodega'
                rules={[{ required: true, message: 'Ingrese una cantidad!' }]}
              >
                <Select style={{ width: 140 }}>
                  {bodegas
                    ? bodegas.map(data => {
                        const { Id, Description } = data
                        return <Option key={Id}>{Description}</Option>
                      })
                    : null}
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button style={{ background: '#febb48' }} htmlType='submit'>
                  Guardar
                </Button>
              </Form.Item>
              <Divider orientation='left'>Desea eliminar ?</Divider>
              <Button type='danger' htmlType='submit' onClick={confirmoAccion}>
                Eliminar
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}
