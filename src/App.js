import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DataContext } from './components/context/context';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Login from './components/login/login';

const App = () => {
	const { Header, Sider, Content, Footer } = Layout;
	const { logeado, destruirSesion } = useContext(DataContext);

	return (
		<BrowserRouter>
			<Login/>
		</BrowserRouter>
	);
};

export default App;
