import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
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

    // Este teste verifica se todos os 
    // campos necessários no formulário de registro estão renderizados corretamente.

    test("atualiza os valores dos campos ao alterar", async () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const nameInput = screen.getByTestId("name-input");
        const emailInput = screen.getByTestId("email-input");
        const idadeInput = screen.getByTestId("idade-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: "John Doe" } });
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(idadeInput, { target: { value: 30 } });
            fireEvent.change(passwordInput, { target: { value: "password123!" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "password123!" } });
        });

        expect(nameInput.value).toBe("John Doe");
        expect(emailInput.value).toBe("test@example.com");
        expect(idadeInput.value).toBe("30");
        expect(passwordInput.value).toBe("password123!");
        expect(confirmPasswordInput.value).toBe("password123!");
    });

    // Este teste garante que os valores de cada campo de entrada 
    // sejam atualizados corretamente quando o usuário digita nos campos.

    test("chama onSubmitForm com os dados do usuário quando o formulário é enviado", async () => {
        const mockSubmit = jest.fn();
        render(<RegisterForm onSubmitForm={mockSubmit} />);

        const nameInput = screen.getByTestId("name-input");
        const emailInput = screen.getByTestId("email-input");
        const idadeInput = screen.getByTestId("idade-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");
        const botaoSubmit = screen.getByTestId("submit-button");

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: "John Doe" } });
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(idadeInput, { target: { value: 30 } });
            fireEvent.change(passwordInput, { target: { value: "password123!" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "password123!" } });
        });

        await act(async () => {
            fireEvent.click(botaoSubmit);
        });

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

        const nameInput = screen.getByTestId("name-input");
        fireEvent.change(nameInput, { target: { value: "Jo" } }); // invalid name
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-name")).toBeInTheDocument();
        expect(screen.getByTestId("error-name")).toHaveTextContent(
            "Nome precisa ter mais de 3 letras."
        );
    });

    test("mostra mensagem de erro para email inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const emailInput = screen.getByTestId("email-input");
        fireEvent.change(emailInput, { target: { value: "invalid-email" } }); // invalid email
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-email")).toBeInTheDocument();
        expect(screen.getByTestId("error-email")).toHaveTextContent(
            "Email inválido."
        );
    });

    test("mostra mensagem de erro para idade inválida", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const idadeInput = screen.getByTestId("idade-input");
        fireEvent.change(idadeInput, { target: { value: 15 } }); // invalid age
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-idade")).toBeInTheDocument();
        expect(screen.getByTestId("error-idade")).toHaveTextContent(
            "Idade precisa ser maior que 16."
        );
    });

    test("mostra mensagem de erro para senha inválida", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const passwordInput = screen.getByTestId("password-input");
        fireEvent.change(passwordInput, { target: { value: "pass" } }); // invalid password
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-password")).toBeInTheDocument();
        expect(screen.getByTestId("error-password")).toHaveTextContent(
            "Senha precisa ter mais de 6 letras, um número e um caractere especial."
        );
    });

    test("mostra mensagem de erro para confirmação de senha inválida", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");
        fireEvent.change(passwordInput, { target: { value: "Password123!" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } }); // passwords do not match
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-confirmPassword")).toBeInTheDocument();
        expect(screen.getByTestId("error-confirmPassword")).toHaveTextContent(
            "As senhas não coincidem."
        );
    });
    // Explicação: Este teste verifica se, ao preencher e submeter o formulário de registro,
    // a função onSubmitForm é chamada com os valores corretos de entrada.
});
