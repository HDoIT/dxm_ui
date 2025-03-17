import React, { useEffect } from "react";
import DefaultLayout from '../Layout';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/userAction";

const PublicRoute = () => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadUser());
        }
    }, [isAuthenticated, dispatch]);

    // if (loading) {
    //     console.log("abcs");
    //     return null;
    // }

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