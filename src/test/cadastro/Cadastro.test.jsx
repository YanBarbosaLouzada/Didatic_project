import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RegisterForm from "../../components/authComponents/Register";

describe("Componente Register", () => { 
    test("renderiza o formulário de registro", () => { 
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        expect(screen.getByText("Criar usuário:")).toBeInTheDocument();
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("idade-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    test("atualiza os valores dos campos ao alterar", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const nameInput = screen.getByTestId("name-input");
        const emailInput = screen.getByTestId("email-input");
        const idadeInput = screen.getByTestId("idade-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");

        //Simulando que uma pessoa esta preenchendo o formulario
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(idadeInput, { target: { value: "30" } });
        fireEvent.change(passwordInput, { target: { value: "password123!" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "password123!" } });

        expect(nameInput.value).toBe("John Doe");
        expect(emailInput.value).toBe("test@example.com");
        expect(idadeInput.value).toBe("30");
        expect(passwordInput.value).toBe("password123!");
        expect(confirmPasswordInput.value).toBe("password123!");
    });

    test("chama onSubmitForm com os dados corretos", () => {
        const mockSubmit = jest.fn();
        render(<RegisterForm onSubmitForm={mockSubmit} />);

        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByTestId("idade-input"), { target: { value: "30" } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "password123!" } });
        fireEvent.change(screen.getByTestId("confirmPassword-input"), { target: { value: "password123!" } });

        fireEvent.click(screen.getByTestId("submit-button"));

        expect(mockSubmit).toHaveBeenCalledWith({
            name: "John Doe",
            email: "test@example.com",
            idade: 30,
            password: "password123!",
            confirmPassword: "password123!",
            role: "common"
        });
    });

    test("mostra mensagem de erro para nome inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Jo" } }); 
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-name")).toHaveTextContent(
            "Nome precisa ter mais de 3 letras."
        );
    });

    test("mostra mensagem de erro para email inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "invalid-email" } });
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-email")).toHaveTextContent("Email inválido.");
    });

    test("mostra mensagem de erro para idade inválida", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("idade-input"), { target: { value: "15" } });
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-idade")).toHaveTextContent(
            "Idade precisa ser maior que 16."
        );
    });

    test("mostra mensagem de erro para senha inválida", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "pass" } });
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-password")).toHaveTextContent(
            "Senha precisa ter mais de 6 letras, um número e um caractere especial."
        );
    });

    test("mostra mensagem de erro para confirmação de senha inválida", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "Password123!" } });
        fireEvent.change(screen.getByTestId("confirmPassword-input"), { target: { value: "Password123" } });
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-confirmPassword")).toHaveTextContent(
            "As senhas não coincidem."
        );
    });
});
