import React, { useState, useEffect } from 'react';
import {
	Alert,
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
	Select,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../pedidos/tabla.css';

export const Factura = (props) => {
	const {
		dataTablaProducto,
		columnasDataFactura,
		llenarEncabezadoFactura,
		eliminarLinea,
		productosData,
		nombresData,
		agregarProducto,
	} = props;

	const { Option } = Select;
	useEffect(() => {
		try {
			llenarEncabezadoFactura();
		} catch (error) {
			console.error(error);
		}
	}, []);
	const onFinish = (values) => {
        
		console.log('llego con los siguientes datos');
		console.log(values);

		// actualizarDataPedido(values, factura);
	};

	const facturar = () => {
		console.log(true);
	};

	const guardar = () => {
		console.log(false);
	};

	const onFinishFailed = (errorInfo) => {
		console.error('Failed:', errorInfo);
		message.error(errorInfo);
	};

	const handleCancel = () => {
		console.log('cancelo');
	};

	const handleEnter = (event) => {
		console.log('detecto');
		console.log(event);
	};

	const { Title, Text } = Typography;
	return (
		<div>
			<Form
				name='basic'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout='vertical '
				style={{ paddingTop: '20px' }}>
				<Row gutter={16}>
					<Col className='gutter-row' span={4}>
						<Form.Item label='Documento' name='documento'>
							<InputNumber size='short' autoComplete='off' />
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item
							label='Nombre completo.'
							name='nombre'
							rules={[
								{
									required: true,
									message: 'Favor ingresar Nombre!',
								},
							]}>
							<Select
								placeholder='Seleccione...'
								showSearch
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >=
									0
								}>
								{nombresData.map((datos) => {
									return <Option key={datos.id}>{datos.dato}</Option>;
								})}
							</Select>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={12}></Col>
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
						<Title level={5}>Descripcion.</Title>
						<Select
							style={{ width: '100%' }}
							placeholder='Seleccione...'
							showSearch
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}>
							{productosData.map((datos) => {
								return <Option key={datos.id}>{datos.dato}</Option>;
							})}
						</Select>
					</Col>
					<Col className='gutter-row' span={3}>
						<Title level={5}>Cantidad.</Title>
                        <InputNumber 
                        onChange={handleEnter}
                        size='short' autoComplete='off' />
					</Col>
					<Col className='gutter-row' span={3}>
                    <Title level={5}>Valor U.</Title>
						<Text>$ 1.0000</Text>
					</Col>
					<Col className='gutter-row' span={3}>
						<Title level={3}>Total</Title>
						<Text>$ 5.0000</Text>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col className='gutter-row' span={24}>
						<Table
							className='tabla-pedidos'
							columns={columnasDataFactura}
							dataSource={dataTablaProducto}
							onRow={(record) => {
								return {
									onDoubleClick: () => {
										eliminarLinea(record);
									},
								};
							}}
						/>
					</Col>
					<Col className='gutter-row' span={9} offset={15}>
						<Text mark>
							* Doble 'Click' sobre el producto que desea eliminar *
						</Text>
					</Col>
					<Col className='gutter-row' span={24}>
						<Title level={3}>
							Total Pedido
							<Alert
								message='$ 15.0000'
								type='info'
								style={{ maxWidth: '180px' }}
							/>{' '}
						</Title>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item>
							<Button htmlType='submit' onClick={guardar}>
								Guardar
							</Button>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item>
							<Button htmlType='submit' onClick={facturar}>
								Facturar
							</Button>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Button onClick={handleCancel}>Cancelar</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
