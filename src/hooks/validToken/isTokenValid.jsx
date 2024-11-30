import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useCheckAuth() {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:4444/auth/admin', {
                    withCredentials: true,
                });
                console.log('Resposta da API:', response.data); // Debug
                if (response.status === 200 && response.data.role === 'admin') {
                    setIsAuthorized(true);

                } else {
                    setIsAuthorized(false);
                    navigate('/auth');
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Você não tem permissão para acessar esta página.');
                    navigate('/');
                } else {
                    console.error('Erro ao verificar autenticação:', error);
                    setIsAuthorized(false);
                    navigate('/auth');
                }
            }
        };
        
        checkAuth();
    }, [navigate]);

    return isAuthorized;
}

export default useCheckAuth;

