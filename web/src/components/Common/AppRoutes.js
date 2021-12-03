import React, {useContext} from 'react';
import {
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import MainPage from '../../pages/MainPage/MainPage';
import ApplicationsPage from '../../pages/ApplicationsPage/ApplicationsPage';
import ClientsPage from '../../pages/ClientsPage/ClientsPage';
import TrailersPage from '../../pages/TrailersPage/TrailersPage';
import PartsPage from '../../pages/PartsPage/PartsPage';
import WorksPage from '../../pages/WorksPage/WorksPage';
import OrdersPage from '../../pages/OrdersPage/OrdersPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import AuthApi from './AuthApi';

const ProtectedRoute = () => {
    const authApi = useContext(AuthApi);
    if(authApi && authApi.auth) {
        return <Outlet />;
    } else {
        return  <Navigate to="/login" />;
    }
};

const NotLoginRoute = () => {
    const authApi = useContext(AuthApi);
    if(!authApi || !authApi.auth) {
        return <Outlet />;
    } else {
        return  <Navigate to="/" />;
    }
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<ProtectedRoute/>}
            >
                <Route path="/" element={<MainPage/>} />
            </Route>
            <Route
                path="/applications"
                element={<ProtectedRoute/>}
            >
                <Route path="/applications" element={<ApplicationsPage/>} />
            </Route>
            <Route
                path="/clients"
                element={<ProtectedRoute/>}
            >
                <Route path="/clients" element={<ClientsPage/>} />
            </Route>
            <Route
                path="/trailers"
                element={<ProtectedRoute/>}
            >
                <Route path="/trailers" element={<TrailersPage/>} />
            </Route>
            <Route
                path="/parts"
                element={<ProtectedRoute/>}
            >
                <Route path="/parts" element={<PartsPage/>} />
            </Route>
            <Route
                path="/works"
                element={<ProtectedRoute/>}
            >
                <Route path="/works" element={<WorksPage/>} />
            </Route>
            <Route
                path="/orders"
                element={<ProtectedRoute/>}
            >
                <Route path="/orders" element={<OrdersPage/>} />
            </Route>
            <Route
                path="/login"
                element={<NotLoginRoute/>}
            >
                <Route path="/login" element={<LoginPage/>} />
            </Route>
        </Routes>
    )
};

export default AppRoutes;