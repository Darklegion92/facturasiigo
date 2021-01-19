import React, { Fragment, useContext, useState } from 'react'
import { Typography, Row, Col, Button, message } from 'antd'
import { ShoppingCartOutlined, TeamOutlined,DiffOutlined,BankOutlined} from '@ant-design/icons'
import { DataContext } from '../context/context'
const { Title } = Typography

function Updates () {
  const [spinProducts, setSpinProducts] = useState(false)
  const [spinClients, setSpinClients] = useState(false)
  const [spinTaxes, setSpinTaxes] = useState(false)
  const [spinWarehouses, setSpinWarehouses] = useState(false)

  const {
    consultarClients,
    consultarProducts,
    consultarWarehouses,
    consultarTaxes
  } = useContext(DataContext)

  const onClickProducts = async () => {
    setSpinProducts(true)
    const resp = await consultarProducts()
    if (resp === false) {
      setSpinProducts(resp)
      message.success('Artículos Actualizados Correctamente')
    }
  }

  const onClickClients = async () => {
    setSpinClients(true)

    const resp = await consultarClients()
    if (resp === false) {
      setSpinClients(false)

      message.success('Clientes Actualizados Correctamente')
    }
  }

  const onClickWarehouses = async () => {
    setSpinWarehouses(true)
    const resp = await consultarWarehouses()
    if (resp === false) {
      setSpinWarehouses(false)

      message.success('Bodegas Actualizados Correctamente')
    }
  }
  const onClickTaxes = async () => {
    setSpinTaxes(true)
    const resp = await consultarTaxes()
    if (resp === false) {
      setSpinTaxes(false)
      message.success('Tarifas Actualizados Correctamente')
    }
  }

  return (
    <Fragment>
      <Row style={{ paddingTop: '30px' }}>
        <Col>
          <Title>Actualizaciones</Title>
        </Col>
      </Row>
      <Row gutter={16} justify='center'>
        <Col span={6}>
          <Title level={4}>Actualizar Artículos</Title>
          <Button
            onClick={onClickProducts}
            type='primary'
            style={{ background: '#febb48', width: 'auto', height: 'auto' }}
            icon={
              <ShoppingCartOutlined
                spin={spinProducts}
                style={{ fontSize: '100px', margin: '10px' }}
              />
            }
          />
        </Col>
        <Col span={6}>
          <Title level={4}>Actualizar Clientes</Title>
          <Button
            onClick={onClickClients}
            type='primary'
            icon={
              <TeamOutlined
                style={{ fontSize: '100px', margin: '10px' }}
                spin={spinClients}
              />
            }
            style={{ background: '#febb48', width: 'auto', height: 'auto' }}
          />
        </Col>
        <Col span={6}>
          <Title level={4}>Actualizar Bodegas</Title>
          <Button
            onClick={onClickWarehouses}
            type='primary'
            icon={
              <BankOutlined
                style={{ fontSize: '100px', margin: '10px' }}
                spin={spinWarehouses}
              />
            }
            style={{ background: '#febb48', width: 'auto', height: 'auto' }}
          />
        </Col>
        <Col span={6}>
          <Title level={4}>Actualizar Tatifas IVA</Title>
          <Button
            onClick={onClickTaxes}
            type='primary'
            icon={
              <DiffOutlined
                style={{ fontSize: '100px', margin: '10px' }}
                spin={spinTaxes}
              />
            }
            style={{ background: '#febb48', width: 'auto', height: 'auto' }}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Updates
