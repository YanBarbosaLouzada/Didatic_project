import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LoginForm from "../../components/authComponents/Login.jsx";

describe("Testando componente LoginForm", () => {
    test("Vamos testar se o formulário de login é renderizado com os elementos essenciais (Campos de Email, Senha e Botões)", () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        // Verifica se o texto "Entrar:" está presente na tela
        expect(screen.getByText("Entrar:")).toBeInTheDocument();
        // Verifica se o campo de Email está presente na tela
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        // Verifica se o campo de Senha está presente na tela
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        // Verifica se o botão de envio está presente na tela
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();

    });

    test("Vamos testar se os campos de Email e Senha atualizam seus valores quando o usuário os preenche", () => {
        render(<LoginForm onSubmitForm={jest.fn()} />);

        // Pega o campo de Email
        const emailInput = screen.getByTestId("email-input");
        // Pega o campo de Senha
        const senhaInput = screen.getByTestId("password-input");

        // Simula a mudança do campo de Email
        fireEvent.change(emailInput, {
            target: { value: "test@example.com" }
        });
        // Simula a mudança do campo de Senha
        fireEvent.change(senhaInput, {
            target: { value: "password123" }
        });

        // Verifica se o campo de Email foi preenchido corretamente
        expect(emailInput.value).toBe("test@example.com");
        // Verifica se o campo de Senha foi preenchido corretamente
        expect(senhaInput.value).toBe("password123");
    });

    test("Vamos testar se a função onSubmitForm é chamada com os dados corretos quando o formulário é enviado", () => {
        
        // Cria uma função mock para simular a função onSubmitForm
        const mockSubmit = jest.fn(); // Função mock para simular o envio do formulário

        // Renderiza o componente LoginForm com a função mock como props
        render(<LoginForm onSubmitForm={mockSubmit} />);

        // Pega o campo de Email
        const emailInput = screen.getByTestId("email-input");
        // Pega o campo de Senha
        const senhaInput = screen.getByTestId("password-input");
        // Pega o botão de envio
        const botaoSubmit = screen.getByTestId("submit-button");

        // Simula a mudança do campo de Email
        fireEvent.change(emailInput, {target: { value: "test@example.com" }});

        // Simula a mudança do campo de Senha
        fireEvent.change(senhaInput, {target: { value: "password123" }});

        // Simula o clique no botão de envio
        fireEvent.click(botaoSubmit);

        // Verifica se a função mockSubmit foi chamada com os dados corretos
        expect(mockSubmit).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
        });

    });

});