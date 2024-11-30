import React, { useState } from "react";
import "./Form.css";

function RegisterForm(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        idade: 0,
        password: "",
        confirmPassword: "",
        role: "common"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitForm(user);
    };
    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Criar usuário</h1>
            <label htmlFor="name">Nome</label>
            <input
                type="text"
                placeholder="Nome do usuário"
                id="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
            />
            <label htmlFor="email">Email</label>
            <input
                value={user.email}
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email..."
                id="email"
            />
            <label htmlFor="idade">Idade</label>
            <input
                value={user.idade}
                type="number"
                onChange={(e) =>
                    setUser({ ...user, idade: parseInt(e.target.value) })
                }
                placeholder="Idade"
                id="idade"
            />
            <label htmlFor="password">Senha</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Senha..."
                id="password"
            />
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
                value={user.confirmPassword}
                type="password"
                onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                }
                placeholder="Confirme sua senha..."
                id="confirmPassword"
            />
            <button>Registrar</button>
        </form>
    );
}

export default RegisterForm;