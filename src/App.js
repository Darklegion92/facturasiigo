import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DataContext } from './components/context/context';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Login } from './components/login/containerLogin';
import { Loading } from './components/loading/loading';

export const App = () => {
	// const { Header, Sider, Content, Footer } = Layout;
	const { mtdLoading } = useContext(DataContext);
	return (
		<>
			<BrowserRouter>
				<Login />
			</BrowserRouter>
			<Loading />
		</>
	);
};


