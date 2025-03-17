import { Layout, theme, Avatar, Badge, Dropdown, Menu, Space, Typography } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

export const HeaderLayout = () => {
    const { user, error, loading, isAuthenticated } = useSelector((state) => state.user);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    console.log("user ", user)
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: 'Profile',
                    icon: <UserOutlined />,
                },
                {
                    key: '2',
                    label: 'Settings',
                    icon: <SettingOutlined />,
                },
                {
                    key: '3',
                    type: 'divider',
                },
                {
                    key: '4',
                    label: 'Logout',
                    icon: <LogoutOutlined />,
                },
            ]}
        />
    );

    const location = useLocation()

    // const isLocation = location.pathname === "/"
    return (
        <Header
            style={{
                padding: '0 24px',
                background: colorBgContainer,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            {
                isAuthenticated && (
                    <Space size="middle">
                        <Badge count={1}>
                            <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                        </Badge>

                        <Text strong>{user.fullName}</Text>

                        <Dropdown menu={menu} placement="bottomRight">
                            <Avatar size="large" style={{ cursor: 'pointer' }}>{user.fullName}</Avatar>
                        </Dropdown>
                    </Space>
                )
            }

        </Header>
    );
};