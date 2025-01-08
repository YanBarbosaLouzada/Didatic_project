import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <p>Carregando...</p>;

    return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;
