import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { DataContext } from './components/context/context'
import { Loading } from './components/loading/loading'
import { ContainerLogin } from './components/login/containerLogin'
import Default from './components/Default/Default'
import ProtecRoutes from './components/Routes/ProtecRoutes'
import FreeRoute from './components/Routes/FreeRoute'
import { Pedidos } from './components/pedidos/pedidos'
import 'antd/dist/antd.css'
import { Layout, Menu, Modal } from 'antd'
import { ModalDetalle } from './components/pedidos/modalDetalle'
import { Confirmacion } from './components/modal/confirmacion'
import { Factura } from './components/factura/factura'
import Updates from './components/Updates'

export const App = () => {
  const { Header, Content } = Layout

  const {
    logeado,
    onFinish,
    columnasPedidos,
    dataPedidos,
    toggleDetalle,
    visibleDetalle,
    enviarDatosModalEditarPedidos,
    dataPedidoEditar,
    actualizarDataPedido,
    columnasPedidosModaldetalle,
    dataModalEditar,
    eliminarLinea,
    visibleModalConfirmacion,
    visibleModalConfirmacionItemFactura,
    confirmoAccionItemFactura,
    toggleConfirmarItemFactura,
    toggleConfirmar,
    onSearchNombres,
    mensajeModal,
    confirmoAccion,
    columnasDataFactura,
    eliminarItemFactura,
    datosCliente,
    consultarClienteCodigo,
    productosData,
    nombresData,
    consultarArticuloCodigo,
    dataTablaProducto,
    datosArticulo,
    agregarItem,
    cosultarArticuloNombre,
    agregarProducto,
    agregarItemFactura,
    seleccionarArticulo,
    calcularDescuento,
    editar,
    editoDatos,
    bodegas
  } = useContext(DataContext)
  return (
    <>
      <BrowserRouter>
        {logeado ? (
          <>
            <Header>
              <div className='logo' />
              <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                <Menu.Item key='1'>
                  <Link to='/pedidos'>Orden</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                  <Link to='/updates'>Actualizaciones</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Switch>
                <FreeRoute exact path='/' component={ContainerLogin} />
                <ProtecRoutes
                  path='/pedidos'
                  children={
                    <Pedidos
                      onFinish={onFinish}
                      columnasPedidos={columnasPedidos}
                      dataPedidos={dataPedidos}
                      toggleDetalle={toggleDetalle}
                      enviarDatosModalEditarPedidos={
                        enviarDatosModalEditarPedidos
                      }
                    />
                  }
                />
                <ProtecRoutes
                  path='/facturas'
                  children={
                    <Factura
                      consultarClienteCodigo={consultarClienteCodigo}
                      dataTablaProducto={dataTablaProducto}
                      columnasDataFactura={columnasDataFactura}
                      consultarArticuloCodigo={consultarArticuloCodigo}
                      eliminarItemFactura={eliminarItemFactura}
                      agregarItemFactura={agregarItemFactura}
                      productosData={productosData}
                      nombresData={nombresData}
                      actualizarDataPedido={actualizarDataPedido}
                      agregarProducto={agregarProducto}
                      seleccionarArticulo={seleccionarArticulo}
                      onSearchNombres={onSearchNombres}
                      onSearchDescripcion={cosultarArticuloNombre}
                      datosCliente={datosCliente}
                      datosArticulo={datosArticulo}
                    />
                  }
                />
                <ProtecRoutes
                  path='/updates'
                  children={
                    <Updates/>
                  }
                />
                <Route component={Default} />
              </Switch>
            </Content>
          </>
        ) : (
          <>
            <FreeRoute exact path='/' component={ContainerLogin} />
            <Redirect to='/' />
          </>
        )}
      </BrowserRouter>
      <Loading />
      {dataPedidoEditar ? (
        <ModalDetalle
          toggleDetalle={toggleDetalle}
          visibleDetalle={visibleDetalle}
          dataPedidoEditar={dataPedidoEditar}
          actualizarDataPedido={actualizarDataPedido}
          columnasPedidosModaldetalle={columnasPedidosModaldetalle}
          dataModalEditar={dataModalEditar}
          eliminarLinea={eliminarLinea}
          productosData={productosData}
          consultarArticuloCodigo={consultarArticuloCodigo}
          datosArticulo={datosArticulo}
          agregarItem={agregarItem}
          onSearch={cosultarArticuloNombre}
          seleccionarArticulo={seleccionarArticulo}
          calcularDescuento={calcularDescuento}
          bodegas={bodegas}
        />
      ) : null}
      <Confirmacion
        visibleModalConfirmacion={visibleModalConfirmacion}
        toggleConfirmar={toggleConfirmar}
        confirmoAccion={confirmoAccion}
        mensaje={mensajeModal}
        editar={editar}
        editoDatos={editoDatos}
        bodegas={bodegas}
      />
      <Confirmacion
        visibleModalConfirmacion={visibleModalConfirmacionItemFactura}
        toggleConfirmar={toggleConfirmarItemFactura}
        confirmoAccion={confirmoAccionItemFactura}
        mensaje={mensajeModal}
        bodegas={bodegas}
      />
    </>
  )
}
