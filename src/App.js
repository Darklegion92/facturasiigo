import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DataContext } from './components/context/context';
import { Loading } from './components/loading/loading';
import { ContainerLogin } from './components/login/containerLogin';
import Default from './components/Default/Default';
import ProtecRoutes from './components/Routes/ProtecRoutes';
import FreeRoute from './components/Routes/FreeRoute';
import { Pedidos } from './components/pedidos/pedidos';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ModalDetalle } from './components/pedidos/modalDetalle'


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
		actualizarDataPedido
	} = useContext(DataContext);

	return (
		<>
			<BrowserRouter>
				{logeado ? (
					<>
						<Header>
							<div className='logo' />
							<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
								<Menu.Item key='1'>OrdeN</Menu.Item>
								<Menu.Item key='2'>nav 2</Menu.Item>
								<Menu.Item key='3'>nav 3</Menu.Item>
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
										enviarDatosModalEditarPedidos={enviarDatosModalEditarPedidos}
										/>
									}
								/>
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
			{
				dataPedidoEditar? <ModalDetalle toggleDetalle={toggleDetalle} visibleDetalle={visibleDetalle} 
				dataPedidoEditar={dataPedidoEditar} actualizarDataPedido={actualizarDataPedido}/> : null
			}
			
		</>
	);
};
