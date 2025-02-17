import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LoginForm from "../../components/authComponents/Login";

describe("Componente LoginForm", () => {
    test("renderiza o formulário de login com campos de email e senha e um botão de envio", () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        expect(screen.getByText("Entrar:")).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    // Objetivo: Garantir que o formulário seja renderizado com os elementos essenciais.

    test("atualiza os valores dos campos de email e senha ao alterar", () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        const emailInput = screen.getByTestId("email-input");
        const senhaInput = screen.getByTestId("password-input");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(senhaInput, { target: { value: "password123" } });

        expect(emailInput.value).toBe("test@example.com");
        expect(senhaInput.value).toBe("password123");
    });

    // Objetivo: Garantir que os campos de e - mail e senha atualizem seus valores quando o usuário os preenche.

    test("chama onSubmitForm com os dados do usuário quando o formulário é enviado", () => {
        const mockSubmit = jest.fn();
        render(<LoginForm onSubmitForm={mockSubmit} />);

        const emailInput = screen.getByTestId("email-input");
        const senhaInput = screen.getByTestId("password-input");
        const botaoSubmit = screen.getByTestId("submit-button");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(senhaInput, { target: { value: "password123" } });
        fireEvent.click(botaoSubmit);

        expect(mockSubmit).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
        });
    });

    // Objetivo: Testar se a função onSubmitForm é chamada com os dados corretos quando o formulário é enviado.
});
