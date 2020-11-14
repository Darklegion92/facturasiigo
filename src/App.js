import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { DataContext } from './components/context/context';
import { Loading } from './components/loading/loading';
import { ContainerLogin } from './components/login/containerLogin';
import Default from './components/Default/Default';
import ProtecRoutes from './components/Routes/ProtecRoutes';
import FreeRoute from './components/Routes/FreeRoute';
import { Pedidos } from './components/pedidos/pedidos';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ModalDetalle } from './components/pedidos/modalDetalle';
import { Confirmacion } from './components/modal/confirmacion'
import { Factura } from './components/factura/factura'

export const App = () => {
	// const { Header, Sider, Content, Footer } = Layout;
	const { Header, Content, Footer } = Layout;

	const {
		mtdLoading,
		logeado,
		estadoData,
		onFinishFailed,
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
		toggleConfirmar, 
		mensajeModal,
		confirmoAccion,
		columnasDataFactura,
		llenarEncabezadoFactura,
		productosData,
		nombresData,
		dataTablaProducto,
		agregarProducto
	} = useContext(DataContext);

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
								<Link to='/facturas'>Factura</Link>
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
											estadoData={estadoData}
											onFinish={onFinish}
											onFinishFailed={onFinishFailed}
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
									path='/facturas' children={
										<Factura 
										columnasDataFactura={columnasDataFactura}
										llenarEncabezadoFactura={llenarEncabezadoFactura}
										productosData={productosData}
										nombresData={nombresData}
										dataTablaProducto={dataTablaProducto}
										agregarProducto={agregarProducto}
										/>
										}/>
								<Route component={Default} />
							</Switch>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							Ant Design ©2018 Created by Ant UED
						</Footer>
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
				/>
			) : null}
			<Confirmacion 
			visibleModalConfirmacion= {visibleModalConfirmacion} 
			toggleConfirmar={toggleConfirmar} 
			confirmoAccion={confirmoAccion}
			mensaje= {mensajeModal}/>
		</>
	);
};
