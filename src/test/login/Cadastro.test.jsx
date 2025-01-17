import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom/extend-expect";
import RegisterForm from "../../components/authComponents/Register";

describe("Componente Register", () => {
    test("renderiza o formulário de registro", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        expect(screen.getByText("Criar usuário")).toBeInTheDocument();
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("idade-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

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
            fireEvent.change(passwordInput, { target: { value: "password123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
        });

        expect(nameInput.value).toBe("John Doe");
        expect(emailInput.value).toBe("test@example.com");
        expect(idadeInput.value).toBe("30");
        expect(passwordInput.value).toBe("password123");
        expect(confirmPasswordInput.value).toBe("password123");
    });

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
            fireEvent.change(passwordInput, { target: { value: "password123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
        });

        await act(async () => {
            fireEvent.click(botaoSubmit);
        });

        expect(mockSubmit).toHaveBeenCalledWith({
            name: "John Doe",
            email: "test@example.com",
            idade: 30,
            password: "password123",
            confirmPassword: "password123",
            role: "common"
        });
    });
});
