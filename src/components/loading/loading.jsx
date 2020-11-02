import React, { useState, useContext } from 'react';
import { Row, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { DataContext } from "../context/context";


export const Loading = () => {
    const {visibleLoading} = useContext(DataContext);
	return (
		<Modal
			visible={visibleLoading}
			footer={null}
			centered={true}
			width='300px'
			bodyStyle={{ backgroundColor: 'transparent' }}
			style={{ backgroundColor: 'transparent' }}
			closable={false}>
			<Row
				justify='center'
				align='middle'
				style={{ backgroundColor: 'transparent' }}>
				<LoadingOutlined
					style={{ fontSize: '150px', backgroundColor: 'transparent' }}
				/>
			</Row>
		</Modal>
	);
};
