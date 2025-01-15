import React, { useContext, useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { isAuthenticated, logout, checkAdmin } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verifica se o usuário é admin ao montar o componente
        const verifyAdmin = async () => {
            const isAdminUser = await checkAdmin();
            setIsAdmin(isAdminUser);
        };
        verifyAdmin();
    }, [checkAdmin]);

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Produtos</NavLink>
            <NavLink to="/pokemons">Pokemons</NavLink>
            <NavLink to="/chat">Chat</NavLink>
            {isAdmin && <NavLink to="/musicas">Músicas</NavLink>}
            {isAuthenticated ? (
                <>
                    <a onClick={logout} style={{ cursor: "pointer" }}>Sair</a>
                </>
            ) : (
                <NavLink to="/auth">Entrar</NavLink>
            )}
        </nav>
    );
}

export default Navbar;
