import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from 'react'
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
    // Função render: Renderiza o componente LoginForm para o ambiente de teste.
    // Função screen.getByText: Busca o texto "Logar" para confirmar que o botão está visível.
    // Função screen.getByLabelText: Verifica se os campos de e - mail e senha são acessíveis pelo aria - label(ajuda em acessibilidade).
    // Função screen.getByTestId: Confirma que o botão de envio(submit - button) está presente no DOM.

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

    // Objetivo: Garantir que os campos de e - mail e senha atualizem seus valores quando o usuário os preenche.
    // Função fireEvent.change: Simula a alteração de valor nos campos de texto.
    // Função expect(...).toBe: Verifica se os valores digitados nos campos correspondem ao esperado("test@example.com" e "password123").
    // Por que usamos act: Envolve ações assíncronas para garantir que todas as atualizações do React sejam concluídas antes de verificar os valores.

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

    // Objetivo: Testar se a função onSubmitForm é chamada com os dados corretos quando o formulário é enviado.
    // Função jest.fn(): Cria uma função fictícia(mock) para verificar se ela foi chamada e com quais parâmetros.
    // Função fireEvent.click: Simula o clique no botão de envio do formulário.
    // Função expect(mockSubmit).toHaveBeenCalledWith: Verifica se a função onSubmitForm foi chamada com os valores corretos de e - mail e senha.
});
