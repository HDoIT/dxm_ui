import { Layout } from 'antd';
import React, { useState } from 'react'
import { HeaderLayout } from './Header';
import { FooterLayout } from './Footer';
import Sidebar from './Sidebar/Sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const { Header, Content, Footer, Sider } = Layout;
const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate = (nav) => {
        if (nav === "") {
            dispatch(logout())
        }
        navigate(nav)
    };

    const handleCollapse = (value) => {
        setCollapsed(value)
    };
    const location = useLocation()

    const isLoginLocation = location.pathname === '/';
    return (
        <Layout
            style={{
                // minHeight: '100vh',
            }}
        >
            {!isLoginLocation &&
                (<Sidebar collapsed={collapsed} handleCollapse={handleCollapse} handleNavigate={handleNavigate} />
                )}

            <Layout style={{ 
                        marginLeft: collapsed ? -100 : 80,
                        transition: 'margin-left 0.2s' // Hiệu ứng mượt
                    }}>
                <Header>
                    <HeaderLayout />
                </Header>
                <Outlet />
                <Footer>
                    <FooterLayout />
                </Footer>
            </Layout>
        </Layout >
    )
}
export default DefaultLayout;