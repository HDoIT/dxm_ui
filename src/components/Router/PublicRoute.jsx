import React from "react";
import DefaultLayout from '../Layout';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user)

    if (loading) {
        return null;
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <DefaultLayout>
            <Outlet />
        </DefaultLayout>
    );
};

export default PublicRoute;