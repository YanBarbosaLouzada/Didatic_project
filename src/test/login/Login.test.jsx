import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "../../components/authComponents/Login";

describe("Componente LoginForm", () => {
    test("renderiza o formulário de login com campos de email e senha e um botão de envio", () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        expect(screen.getByText("Logar")).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    test("atualiza os valores dos campos de email e senha ao alterar", async () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        const emailInput = screen.getByTestId("email-input");
        const senhaInput = screen.getByTestId("password-input");

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(senhaInput, { target: { value: "password123" } });
        });

        expect(emailInput.value).toBe("test@example.com");
        expect(senhaInput.value).toBe("password123");
    });

    test("chama onSubmitForm com os dados do usuário quando o formulário é enviado", async () => {
        const mockSubmit = jest.fn();
        render(<LoginForm onSubmitForm={mockSubmit} />);

        const emailInput = screen.getByTestId("email-input");
        const senhaInput = screen.getByTestId("password-input");
        const botaoSubmit = screen.getByTestId("submit-button");

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(senhaInput, { target: { value: "password123" } });
        });

        await act(async () => {
            fireEvent.click(botaoSubmit);
        });

        expect(mockSubmit).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
        });
    });
});
