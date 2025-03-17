import React, { useEffect, useState } from 'react'
import "./Sidebar.scss";
import {
    DesktopOutlined,
    LogoutOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    FileOutlined,
    ToolFilled
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation } from 'react-router-dom';
const { Sider } = Layout;
function getItem(label, key, icon, children, to) {
    return {
        key,
        icon,
        children,
        label,
        to,
    };
}
const items = [
    getItem('Dashboard', '/dashboard', <PieChartOutlined />, '', "dashboard"),
    getItem('My spending', '/myspending', <DesktopOutlined />, '', "personalspending"),
    getItem('Personal spending', 'sub1', <UserOutlined />, [
        getItem('Do', '/personalpending/do'),
        getItem('Bill', 'personalpending/bill'),
        getItem('Alex', 'personalpending/alex'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '/team/team1'), getItem('Team 2', '/team/team2')]),
    getItem('Files', '/files', <FileOutlined />),
    getItem('Tools', '/tools', <ToolFilled />),
    getItem('Logout', '', <LogoutOutlined />,'',''),
];
const Sidebar = (props) => {
    const { collapsed,handleCollapse,handleNavigate } = props;
    // const { handleCollapse } = props;
    // const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    // Update selected key when location changes
    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1000,
                clear: 'both',
                userSelect: 'none',
                borderRight: '1px solid white',
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            width={'13%'}
        >
            <div className="demo-logo-vertical" style={{ height: '50px' }} />
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]} // Highlight menu item based on URL
                onClick={(e) => handleNavigate(e.key)} // Navigate on click
                items={items}
            />
        </Sider>
    );
};

export default Sidebar;