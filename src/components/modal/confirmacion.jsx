import React from 'react';
import { Modal, Button, Alert  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
export const Confirmacion = (props) => {
    const { visibleModalConfirmacion, toggleConfirmar, mensaje, confirmoAccion } = props;
    
	return (
		<>
			<Modal
				title={null}
				visible={visibleModalConfirmacion}
				onOk={confirmoAccion}
				onCancel={toggleConfirmar}
				okText='Eliminar'
				icon={<ExclamationCircleOutlined />}
				cancelText='Cancelar'>
				<Alert
					message='Advertencia'
					description={mensaje}
					type='warning'
					showIcon
				/>
			</Modal>
		</>
	);
};
