import { NavLink } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

function Navbar() {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4444/auth/logout', {}, { withCredentials: true });
            alert('Logout realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
        }
    };

    return (
        
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Produtos</NavLink>
            <NavLink to="/auth">Sessão</NavLink>
            <NavLink to="/musicas">Musicas</NavLink>
            <button onClick={handleLogout}>Sair</button>
            
        </nav>
    );
}

export default Navbar;