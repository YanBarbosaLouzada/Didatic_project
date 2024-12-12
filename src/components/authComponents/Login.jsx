import React, { useState } from "react";
import "./Form.css";
function LoginForm(props) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitForm(user);
    };
    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Logar</h1>
            <label htmlFor="description">Email:</label>
            <input
                value={user.email}
                type="text"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email..."
                name="description"
                id="description"
            />
            <label htmlFor="description">Senha:</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Senha..."
                name="description"
                id="description"
            />
            <button> Logar </button>
        </form>
    );
}

export default LoginForm;