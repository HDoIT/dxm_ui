import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import DefaultLayout from '../Layout';

const ProtectedRoute = ({ isAdmin }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();

    if (loading) {
        return null; // Hoặc hiển thị một spinner loading
    }
    console.log("authen s" + isAuthenticated)

    // Nếu người dùng chưa được xác thực, chuyển hướng về trang đăng nhập
    if (!isAuthenticated && isAuthenticated!=undefined) {

        return <Navigate to="/" />;
    }

    // Nếu người dùng đã được xác thực, giữ nguyên đường dẫn hiện tại và render Outlet
    return (
        <DefaultLayout>
            <Outlet />
        </DefaultLayout>
    );
};

export default ProtectedRoute;