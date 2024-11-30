import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // Não precisa mais verificar o token no frontend, o backend faz isso
    const token = localStorage.getItem('token'); // Não é mais necessário usar isso, pois o token está no cookie
    if (!token) {
        return <Redirect to="/login" />;
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PrivateRoute;
