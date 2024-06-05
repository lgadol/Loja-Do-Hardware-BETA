import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('userToken') !== null;
    const isAdmin = localStorage.getItem('isAdmin') === '1';

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated && isAdmin ? (
                    <Component {...props} />
                ) : (
                    alert('Você não tem permissão para acessar esta página.'),
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default AdminRoute;