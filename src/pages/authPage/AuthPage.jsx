import React, { useContext, useState } from "react";
import RegisterForm from "../../components/authComponents/Register";
import LoginForm from "../../components/authComponents/Login";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.css";

function AuthPage() {
    const [registerPage, setRegisterPage] = useState(false);
    const { login, register } = useContext(AuthContext);


    return (
        <div id="auth-page">
            {registerPage ? (
                <>
                    <RegisterForm onSubmitForm={register} />
                    <div className="navigate-link" onClick={() => setRegisterPage(false)}>
                        Ir para o login
                    </div>
                </>
            ) : (
                <>
                    <LoginForm onSubmitForm={login} />
                    <div className="navigate-link" onClick={() => setRegisterPage(true)}>
                        Ir para o registro
                    </div>
                </>
            )}
        </div>
    );
}

export default AuthPage;
