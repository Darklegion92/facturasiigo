import React, { useState, useEffect } from 'react';
import { Modal, Row } from 'antd';
import axios from 'axios';
import Alerta from '../alerta';
import { LoadingOutlined } from '@ant-design/icons';

export const DataContext = React.createContext();

const DataProvider = (props) => {
	/** esto se debe poner en un archivo de configuracion */
	const URL = 'http://45.82.72.196:3005/';

	// const [logeado, setLogeado] = useState(false);
	const [logeado, setLogeado] = useState(false);
	const [visibleModal, setVisibleModal] = useState({ visible: false });
	const [visibleLoading, setVisibleLoading] = useState(false);

	const mtdLoading = (estado) => {
		setVisibleLoading(estado);
	};

	const mtdLogin = async (datos, props) => {
		if (datos !== undefined && datos !== null) {
			setVisibleLoading(true);

			try {
				let url = URL + 'admin/ingresar';
				const json = await axios.post(url, { datos });
				const data = json.data;
				console.log(data);
				if (json.status === 200) {
					setVisibleLoading(false);
					setLogeado(true);
					localStorage.setItem('usuarioSesion', JSON.stringify(true));
					localStorage.setItem('token', JSON.stringify(data.token));
					const userName = data.usuario.nombre;
					localStorage.setItem('usuarioNombre', JSON.stringify(userName));
					setVisibleLoading(false);
					setVisibleModal({
						visible: true,
						tipo: 'SUCCESS',
						colorFondoBtn: '#52c41a"',
						colorText: 'black',
						mensaje: `Logeando como: ${userName}`,
						titulo: 'Bienvenido!',
						link: '',
					});
					props.history.push('/slide');
				} else if (json.status === 201) {
					setVisibleLoading(false);
					setVisibleModal({
						visible: true,
						tipo: 'WARNING',
						colorText: 'white',
						colorFondoBtn: '#faab02',
						mensaje: `Usuario y/o Contraseña Incorrectos`,
						titulo: 'Error al Ingresar!',
						link: '',
					});
				}
			} catch (e) {
				setVisibleLoading(false);
				setVisibleModal({
					visible: true,
					tipo: 'ERROR',
					colorFondoBtn: '#fa0202',
					colorText: 'black',
					mensaje: `No se ha obtenido una respuesta desde el servidor `,
					titulo: 'Error de conexion',
					link: '',
				});
				console.error(e);
			}
		}
	};

	/////
	return (
		<DataContext.Provider value={{ visibleLoading, mtdLogin }}>
			{props.children}
			<Alerta modal={visibleModal} setModal={setVisibleModal} />
		</DataContext.Provider>
	);
};

export default DataProvider;
