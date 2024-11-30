import React, { useState } from "react";
import RegisterForm from "../../components/authComponents/Register";
import LoginForm from "../../components/authComponents/Login";
import "./AuthPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [registerPage, setRegisterPage] = useState(false);
    const navigate = useNavigate();

    const registerHook = async (data) => {
        try {
            const response = await axios.post("http://localhost:4444/auth/register", data);
            if (response.status === 201) {
                setRegisterPage((registerPage) => !registerPage);
                console.log("Registrado com sucesso");
            }
        } catch (error) {
            console.error("Erro ao registrar:", error);
            alert("Erro ao registrar. Tente novamente.");
        }
    };

    const loginHook = async (data) => {
        try {
            const response = await axios.post("http://localhost:4444/auth/login",data,
                { withCredentials: true } // Faz com que o cookie seja enviado automaticamente
            );
            if (response.status === 200) {
                console.log("Logado com sucesso");
                navigate("/"); 
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <div id="auth-page">
            {registerPage ? (
                <>
                    <RegisterForm onSubmitForm={registerHook} />
                    <div className="navigate-link" onClick={() => setRegisterPage(false)}>
                        Ir para o login
                    </div>
                </>
            ) : (
                <>
                    <LoginForm onSubmitForm={loginHook} />
                    <div className="navigate-link" onClick={() => setRegisterPage(true)}>
                        Ir para o registro
                    </div>
                </>
            )}
        </div>
    );
}

export default AuthPage;
