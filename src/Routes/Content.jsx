import React from "react";
import { Switch, Route } from 'react-router-dom';
import CartRoute from './CartRoute';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from "./AdminRoute";
import LoginRoute from './LoginRoute';
import { Store } from "../pages/Store";
import { Cart } from "../pages/Cart";
import { Profile } from "../pages/Profile";
import { Product } from "../pages/Product";
import { Payment } from "../pages/Payment";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { EditProduct } from "../pages/EditProduct";
import { ProductPage } from "../pages/ProductPage";

export const Content = () => {
    return (
        <Switch>
            <Route exact path='/' component={Store} />
            <Route exact path='/productPage/:id' component={ProductPage} />
            <CartRoute exact path='/cart' component={Cart} />
            <ProtectedRoute exact path='/profile' component={Profile} />
            <AdminRoute exact path='/product' component={Product} />
            <ProtectedRoute exact path='/payment/:price' component={Payment} />
            <AdminRoute exact path='/editProduct/:id' component={EditProduct} />
            <LoginRoute exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
        </Switch>
    )
}
