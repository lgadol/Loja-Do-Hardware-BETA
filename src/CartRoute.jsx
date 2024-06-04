import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('userToken') !== null;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    toast.error('Você precisa estar logado para acessar o carrinho de compras.', {
                        autoClose: 2000,
                        position: 'bottom-right'
                    }),
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default CartRoute;
