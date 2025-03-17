import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export const AdminRoute = ({ isAdmin, component: Component, ...rest }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.uesr)
    const navigate = useNavigate()

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={""} />
    }

    if (isAdmin && user.role !== "admin" && user.role !== "staff") {
        return <Navigate to={""} />
    }

    return (
        <Outlet />
    )
}
