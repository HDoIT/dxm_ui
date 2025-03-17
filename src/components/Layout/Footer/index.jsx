import { Layout } from 'antd';
import React from 'react'
const { Header, Content, Footer, Sider } = Layout;

export const FooterLayout = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                backgroundColor: "#002140",
                color: "#fff",
                height: 48, 
                lineHeight: 0,               
            }}
        >
            DXM ©{new Date().getFullYear()} Created by LE HUU DO
        </Footer>
    )
}
