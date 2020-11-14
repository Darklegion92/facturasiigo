import React, { useState } from 'react';
import {
	Row,
	Col,
	Divider,
	Form,
	message,
	Input,
	Radio,
	Button,
	Card,
	DatePicker,
	Select,
	Table,
} from 'antd';
import { EditOutlined, InboxOutlined } from '@ant-design/icons';
import './tabla.css';

export const Pedidos = (props) => {

  const { onFinish, onFinishFailed, estadoData, dataPedidos, columnasPedidos, toggleDetalle, enviarDatosModalEditarPedidos } = props;
  
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const onSelectChange = (selectedRowKeys) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const cancelar = () => {
		console.log(selectedRowKeys);
	};

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	
	const { Option } = Select;
  const { RangePicker } = DatePicker;
  

	return (
		<div>
			<Card title='ORDEN DE PEDIDO' style={{maxHeight: '165px'}}>
				<Form
					name='basic'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout='vertical '>
					<Row gutter={16}>
						<Col className='gutter-row' span={4}>
							<Form.Item name='radio-group' label='Buscar por:'>
								<Radio.Group>
									<Radio value='documento'>Documento</Radio>
									<Radio value='nombre'>Nombre</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={6}>
							<Form.Item label='Buscar....' name='buscar'>
								<Input
									size='short'
									autoComplete='off'
									prefix={<EditOutlined />}
								/>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={6}>
							<Form.Item label='Seleccione ....' name='fechas'>
								<RangePicker />
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={4}>
							<Form.Item label='Estado' name='estado'>
								<Select placeholder='Seleccione...'>
									{estadoData
										? estadoData.map((datos) => {
												return <Option key={datos.id}>{datos.dato}</Option>;
										  })
										: null}
								</Select>
							</Form.Item>
						</Col>
            <Col className='gutter-row' span={4}>
							<Form.Item>
								<Button
									style={{ background: '#febb48', marginTop: '30px' }}
									block
									type='primary'
									htmlType='submit'>
									Buscar
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>
			<Row>
				<Col span={24}>
        <Table  className="tabla-pedidos"
					columns={columnasPedidos} dataSource={dataPedidos} 
					onRow={(record, rowIndex) => {
						return {
						 // click row
						  onDoubleClick: (event) => {
                enviarDatosModalEditarPedidos(record)
							 toggleDetalle()
							// cargarTablaDetalle(record)
						  }, // double click row
						 // mouse leave row
						};
					  }} />
        </Col>
			</Row>
		</div>
	);
};
