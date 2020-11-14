import React, { useState } from 'react';
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
	Select
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './tabla.css';

export const ModalDetalle = (props) => {
	const { Title, Text } = Typography;
	const { Option } = Select;
	const [factura, setFactura] = useState(false);

	const {
		visibleDetalle,
		toggleDetalle,
		dataPedidosDetalle,
		columnasDetalle,
		dataPedidoEditar,
		actualizarDataPedido,
		columnasPedidosModaldetalle,
		dataModalEditar,
		eliminarLinea,
		productosData
	} = props;
	console.log(dataPedidoEditar);
	console.log(columnasDetalle);
	console.log(dataPedidosDetalle);

	const onFinish = (values) => {
		console.log('llego con los siguientes datos');
		console.log(values);

		actualizarDataPedido(values, factura);
	};

	const facturar = () => {
		setFactura(true);
	};

	const guardar = () => {
		setFactura(false);
	};
	const onFinishFailed = (errorInfo) => {
		console.error('Failed:', errorInfo);
		message.error(errorInfo);
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
				footer={null}>
				<Form
					name='basic'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout='vertical '>
					<Row gutter={16}>
						<Col
							className='gutter-row'
							span={4}
							style={{ marginBottom: '10px' }}>
							<Title level={4}>Documento</Title>
							<Text>1.093.738.019</Text>
						</Col>
						<Col
							className='gutter-row'
							span={8}
							style={{ marginBottom: '10px' }}>
							<Title level={4}>Nombres</Title>
							<Text> Pepito Pablo Perez alcazar</Text>
						</Col>
						<Col
							className='gutter-row'
							span={12}
							style={{ marginBottom: '10px' }}></Col>
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
							<Form.Item
									label='Descripcion'
									name='descripcion'
									rules={[
										{
											required: true,
											message: 'Favor ingresar Grupo!',
										},
									]}>
									<Select placeholder='Seleccione...'
										showSearch
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										  }
									>
										{productosData.map((datos) => {
											return <Option key={datos.id}>{datos.dato}</Option>;
										})}
									</Select>
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
					<Row gutter={16}>
						<Col className='gutter-row' span={24}>
							<Table
								className='tabla-pedidos'
								columns={columnasPedidosModaldetalle}
								dataSource={dataModalEditar}
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
			</Modal>
		</>
	);
};
