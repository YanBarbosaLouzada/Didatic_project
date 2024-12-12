import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Armazena os dados do usuário logado
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Indica se o usuário está autenticado
    const [loading, setLoading] = useState(true); // Para controlar o carregamento inicial

    

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get("http://localhost:4444/auth/check", { withCredentials: true });
                if (response.status === 200) {
                    setUser(response.data.user); 
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Erro ao verificar login:", error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    const checkAdmin = async () => {
        try {
            const response = await axios.get("http://localhost:4444/auth/admin", {
                withCredentials: true,
            });
            if (response.status === 200 && response.data.role === "admin") {
                setUser({ ...response.data });
                setIsAuthenticated(true);
                return true; 
            } else {
                return false; 
            }
        } catch (error) {
            console.error("Erro ao verificar autenticação admin:", error);
            return false;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:4444/auth/login", credentials, { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Credenciais inválidas.");
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:4444/auth/logout", {}, { withCredentials: true });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    const register = async (data) => {
        try {
            const response = await axios.post("http://localhost:4444/auth/register", data);
            if (response.status === 201) {
                alert("Registrado com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao registrar:", error);
            alert("Erro ao registrar. Tente novamente.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, checkAdmin, register }}>
            {children}
        </AuthContext.Provider>
    );
};
