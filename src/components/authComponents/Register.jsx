import React, { useState } from "react";
import "./Form.css";
function RegisterForm(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        idade: 0,
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitForm(user);
    };
    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Criar usuário</h1>
            <label htmlFor="title">Nome</label>
            <input
                type="text"
                placeholder="Nome do usuário"
                name="title"
                id="title"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
            />
            <label htmlFor="description">Email</label>
            <input
                value={user.email}
                type="text"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email..."
                name="description"
                id="description"
            />
            <label htmlFor="quantity">Idade</label>
            <input
                value={user.idade}
                type="text"
                onChange={(e) => setUser({ ...user, idade: e.target.value })}
                placeholder="Quantidade"
                name="quantity"
                id="quantity"
            />
            <label htmlFor="description">Senha</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Senha..."
                name="description"
                id="description"
            />
            <label htmlFor="description">Confirmar Senha</label>
            <input
                value={user.confirmPassword}
                type="password"
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                placeholder="Confirme sua senha..."
                name="description"
                id="description"
            />
            <button>Registrar.</button>
        </form>
    );
}

export default RegisterForm;