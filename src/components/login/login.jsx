import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';

const Login = () => {
	const gridStyle = {
		width: '25%',
		textAlign: 'center',
	};

	return (
		<Row>
			<Col span={8}></Col>
			<Col span={8}  >
				<Card title='Bienvenido' headStyle={{ textAlign:'center'}}>
					<Card.Grid style={gridStyle}>Content</Card.Grid>
					<Card.Grid hoverable={false} style={gridStyle}>
						Content
					</Card.Grid>
					<Card.Grid style={gridStyle}>Content</Card.Grid>
					<Card.Grid style={gridStyle}>Content</Card.Grid>
					<Card.Grid style={gridStyle}>Content</Card.Grid>
					<Card.Grid style={gridStyle}>Content</Card.Grid>
					<Card.Grid style={gridStyle}>Content</Card.Grid>
				</Card>
			</Col>
			<Col span={8}></Col>
		</Row>
	);
};

export default Login;
