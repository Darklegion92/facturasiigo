import React, { useState } from 'react';
import {
	Row,
	Col,
	Card,
	Typography,
} from 'antd';
import logo from '../../assets/logo.jpg';
import 'antd/dist/antd.css';
import { LoginForm } from './loginForm';


const Login = () => {
	const { Title } = Typography;
	const gridStyle = {
		width: '88%',
		textAlign: 'left',
		marginTop: '15px',
		marginLeft: '20px',
	};

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};


	return (
		<Row>
			<Col span={8}></Col>
			<Col span={8} style={{ paddingTop: '70px' }}>
				<Card
					hoverable
					style={{ width: 360, padding: '13px' }}
					cover={<img alt='logo' src={logo} />}
					title=''
					bodyStyle={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Card.Grid hoverable={false} style={gridStyle}>
						<Title level={3} style={{ marginLeft: '40px' }}>
							<strong>Bienvenido</strong>
						</Title>
						<LoginForm
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						/>
							
					</Card.Grid>
				</Card>
			</Col>
			<Col span={8}></Col>
		</Row>
	);
};

export default Login;
