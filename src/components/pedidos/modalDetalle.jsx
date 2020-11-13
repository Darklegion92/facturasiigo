import React, { useState } from 'react';
import {
	Modal,
	Table,
	Button,
	Form,
	Input,
	Row,
	Col,
	message,
	InputNumber,
	Typography,
} from 'antd';
import { EditOutlined, InboxOutlined } from '@ant-design/icons';

export const ModalDetalle = (props) => {
	const { Title, Paragraph, Text, Link } = Typography;

	const {
		visibleDetalle,
		toggleDetalle,
		dataPedidosDetalle,
		columnasDetalle,
		dataPedidoEditar,
		actualizarDataPedido,
	} = props;
	console.log(dataPedidoEditar);
	console.log(columnasDetalle);
	console.log(dataPedidosDetalle);

	const onFinish = (values) => {
		console.log('llego con los siguientes datos');
		console.log(values);
		actualizarDataPedido(values);
	};

	const onFinishFailed = (errorInfo) => {
		console.error('Failed:', errorInfo);
		message.error(errorInfo);
	};
	const handleOk = () => {
		toggleDetalle();
	};

	const handleCancel = () => {
		toggleDetalle();
	};

	return (
		<>
			<Modal
				style={{ width: '800px' }}
				title='Editar Orden'
				style={{ top: 20 }}
				visible={visibleDetalle}
				onOk={() => toggleDetalle()}
				onCancel={() => toggleDetalle()}
				width={1000}
				footer={[
					<Button key='back' onClick={handleCancel}>
						Cancelar
					</Button>,
				]}>
				<Form
					name='basic'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout='vertical '>
					<Row gutter={16}>
						<Col className='gutter-row' span={4} style={{marginBottom:'10px'}}>
							<Title level={4}>Documento</Title>
							<Text>1.093.738.019</Text>
						</Col>
						<Col className='gutter-row' span={8} style={{marginBottom:'10px'}}>
							<Title level={4}>Nombres</Title>
							<Text> Pepito Pablo Perez alcazar</Text>
						</Col>
						<Col className='gutter-row' span={12} style={{marginBottom:'10px'}}></Col>
						<Col className='gutter-row' span={3}>
							<Form.Item label='Codigo.' name='codigo'>
								<Input
									size='short'
									autoComplete='off'
									prefix={<EditOutlined />}
								/>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={10}>
							<Form.Item label='Descripcion.' name='descripcion'>
								<Input
									size='short'
									autoComplete='off'
									prefix={<EditOutlined />}
								/>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={3}>
							<Form.Item label='Cantidad.' name='cantidad'>
								<InputNumber size='short' autoComplete='off' />
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={3}>
							<Form.Item label='Valor Unitario.' name='valorUnitario'>
								<InputNumber size='short' autoComplete='off' />
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={3}>
							<Title level={3}>Total</Title>
							<Text>$ 5.0000</Text>
						</Col>
					</Row>
				</Form>
				{/* <Table columns={columnasDetalle} dataSource={dataPedidosDetalle} /> */}
			</Modal>
			<br />
			<br />
		</>
	);
};
