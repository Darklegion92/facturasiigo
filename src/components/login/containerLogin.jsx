import React, { useContext } from 'react';
import { DataContext } from '../context/context';
import { Row, Col, Card, Typography } from 'antd';
import logo from '../../assets/logo.jpg';
import 'antd/dist/antd.css';
import { LoginForm } from './loginForm';

export const ContainerLogin = (props) => {
	const { mtdLogin } = useContext(DataContext);

	const { Title } = Typography;
	const gridStyle = {
		width: '88%',
		textAlign: 'left',
		marginTop: '15px',
		marginLeft: '20px',
	};

	const onFinish = (values) => {
		mtdLogin(values, props);
	};

	const onFinishFailed = (errorInfo) => {
		console.error('Failed:', errorInfo);
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
						<LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
					</Card.Grid>
				</Card>
			</Col>
			<Col span={8}></Col>
		</Row>
	);
};
