import React, { useState, useEffect } from 'react';
import { Modal, Row } from 'antd';
import axios from 'axios';
import Alerta from '../alerta';
import { LoadingOutlined } from '@ant-design/icons';
import Login from './logica/login';

export const DataContext = React.createContext();

const DataProvider = (props) => {
	/** esto se debe poner en un archivo de configuracion */
	const URL = 'http://45.82.72.196:3005/';

	// const [logeado, setLogeado] = useState(false);
	const [visibleModal, setVisibleModal] = useState({ visible: false });
	const [visibleLoading, setVisibleLoading] = useState(false);
	
	const login = () => {
		
	}

	/////
	return (
		<DataContext.Provider value={{}}>
			{props.children}
			<Alerta modal={visibleModal} setModal={setVisibleModal} />
			<Modal
				visible={visibleLoading}
				footer={null}
				centered={true}
				width='300px'
				bodyStyle={{ backgroundColor: 'transparent' }}
				style={{ backgroundColor: 'transparent' }}
				closable={false}>
				<Row
					justify='center'
					align='middle'
					style={{ backgroundColor: 'transparent' }}>
					<LoadingOutlined
						style={{ fontSize: '150px', backgroundColor: 'transparent' }}
					/>
				</Row>
			</Modal>
		</DataContext.Provider>
	);
};

export default DataProvider;
