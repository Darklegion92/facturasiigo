import React, { useState } from 'react'
import {
	Input,
	Button,
	Form,
	Checkbox,
} from 'antd';
import {
	UserOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from '@ant-design/icons';

export const LoginForm = (props) => {

    const {onFinish, onFinishFailed } = props;
    
    return ( <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout='vertical '>
        <div style={{ marginTop: '10px' }}>
            <Form.Item
                label='Username'
                name='usuario'
                rules={[
                    {
                        required: true,
                        message: 'Favor ingresar nombre de usuario!',
                    },
                ]}>
                <Input
                    size='large'
                    autoComplete='off'
                    prefix={<UserOutlined />}
                />
            </Form.Item>
        </div>
        <div style={{ marginTop: '8px' }}>
            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Favor ingresar contraseña!',
                    },
                ]}>
                <Input.Password
                    size='large'
                    autoComplete='off'
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                />
            </Form.Item>
        </div>

        <Form.Item name='remember' valuePropName='checked'>
            <Checkbox >Recordarme</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button
                style={{ background: '#febb48' }}
                block
                type='primary'
                htmlType='submit'>
                Enviar
            </Button>
        </Form.Item>
    </Form> );
}
 