import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';
import Alerta from '../alerta';

export const DataContext = React.createContext();

const DataProvider = (props) => {
	/** esto se debe poner en un archivo de configuracion */
	const URL = 'http://45.82.72.196:3005/';

	// const [logeado, setLogeado] = useState(false);
	const [logeado, setLogeado] = useState(false);
	const [visibleModal, setVisibleModal] = useState({ visible: false });
	const [visibleLoading, setVisibleLoading] = useState(false);
	const [estadoData, setEstadoData] = useState('');
	const [columnasPedidos, setcolumnasPedidos] = useState(null);
	const [dataPedidos, setDataPedidos] = useState(null);
	const [visibleDetalle, setVisibleDetalle] = useState(false);
	const [dataPedidoEditar, setDataPedidoEditar] = useState(null);
	const [dataPedidoModificada, setDataPedidoModificada] = useState(null);

	// const mtdLoading = (estado) => {
	// 	setVisibleLoading(estado);
	// };

	const mtdLogin = async (datos, props) => {
		
		message.info('logeado');
		setLogeado(true);
		getEstadoData();
		llenarEncabezado();
		props.history.push('/pedidos');

		// if (datos !== undefined && datos !== null) {
		// 	setVisibleLoading(true);

		// 	try {
		// 		let url = URL + 'admin/ingresar';
		// 		const json = await axios.post(url, { datos });
		// 		const data = json.data;
		// 		console.log(data);
		// 		if (json.status === 200) {
		// 			setVisibleLoading(false);
		// 			setLogeado(true);
		// 			localStorage.setItem('usuarioSesion', JSON.stringify(true));
		// 			localStorage.setItem('token', JSON.stringify(data.token));
		// 			const userName = data.usuario.nombre;
		// 			localStorage.setItem('usuarioNombre', JSON.stringify(userName));
		// 			setVisibleLoading(false);
		// 			setVisibleModal({
		// 				visible: true,
		// 				tipo: 'SUCCESS',
		// 				colorFondoBtn: '#52c41a"',
		// 				colorText: 'black',
		// 				mensaje: `Logeando como: ${userName}`,
		// 				titulo: 'Bienvenido!',
		// 				link: '',
		// 			});
		// 			props.history.push('/pedidos');
		// 		} else if (json.status === 201) {
		// 			setVisibleLoading(false);
		// 			setVisibleModal({
		// 				visible: true,
		// 				tipo: 'WARNING',
		// 				colorText: 'white',
		// 				colorFondoBtn: '#faab02',
		// 				mensaje: `Usuario y/o Contraseña Incorrectos`,
		// 				titulo: 'Error al Ingresar!',
		// 				link: '',
		// 			});
		// 		}
		// 	} catch (e) {
		// 		setVisibleLoading(false);
		// 		setVisibleModal({
		// 			visible: true,
		// 			tipo: 'ERROR',
		// 			colorFondoBtn: '#fa0202',
		// 			colorText: 'black',
		// 			mensaje: `No se ha obtenido una respuesta desde el servidor `,
		// 			titulo: 'Error de conexion',
		// 			link: '',
		// 		});
		// 		console.error(e);
		// 	}
		// }
	};

	const getEstadoData = () => {
		
		setEstadoData([{ dato: 'cocacola', id: 'cocacola' }]);
	};

	//// envio los datos de busqueda inicio
	const onFinish = (values) => {
		console.log('llego con los siguientes datos');
		console.log(values);
		parametrosTablaPedidos();
		
	};

	const onFinishFailed = (errorInfo) => {
		console.error('Failed:', errorInfo);
		message.error(errorInfo);
	};
	//// envio los datos de busqueda fin
	const llenarEncabezado = () => {
		console.log('llenara encabezado')
		setcolumnasPedidos([
			{
				title: 'Codigo',
				dataIndex: 'codigo',
				key: 'codigo',
			},
			{
				title: 'Cliente',
				dataIndex: 'cliente',
				key: 'cliente',
			},
			{
				title: 'Estado',
				dataIndex: 'estado',
				key: 'estado',
			},
		]);
	}
	const parametrosTablaPedidos = () => {
		

		setDataPedidos([
			{
				key: '1',
				codigo: '1234',
				cliente: 'John Brown',
				estado: 'algun estado',
			},
			{
				key: '3',
				codigo: '2255',
				cliente: 'John algo',
				estado: 'algun estado',
			},
			{
				key: '7',
				codigo: '1234',
				cliente: 'John mas',
				estado: 'algun estado',
			},
		]);
	};
	/// logica modal detalle pedido

	const toggleDetalle = () => {
		console.log('cambiara estado')
		setVisibleDetalle(!visibleDetalle);
	};

	const enviarDatosModalEditarPedidos = (data) => {
	setDataPedidoEditar(data)
	}

	const actualizarDataPedido = (data) => {
		
		setDataPedidoModificada(data)
	}

	/////
	return (
		<DataContext.Provider
			value={{
				columnasPedidos,
				dataPedidos,
				visibleLoading,
				mtdLogin,
				logeado,
				onFinish,
				onFinishFailed,
				estadoData,
				toggleDetalle,
				visibleDetalle,
				enviarDatosModalEditarPedidos,
				dataPedidoEditar,
				actualizarDataPedido
			}}>
			{props.children}
			<Alerta modal={visibleModal} setModal={setVisibleModal} />
		</DataContext.Provider>
	);
};

export default DataProvider;
