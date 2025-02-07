import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Join from "../../components/join/Join.jsx";


describe("Join Component", () => {
    it("Deve simular uma pessoa escrevendo o seu nome e clicando no botão de entrar", () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket} />);

        const input = screen.getByPlaceholderText("Nome de usuário");
        fireEvent.change(input, { target: { value: "TestUser" } });

        const button = screen.getByText("Entrar");
        fireEvent.click(button);

        // Verifica se o input realmente recebeu o valor digitado
        expect(input.value).toBe("TestUser");

        // Obtém a referência do `useRef` (acessando diretamente o input)
        const usernameRefValue = input.value;

        // Verifica se `usernameRef.current.value` foi atualizado corretamente
        expect(usernameRefValue).toBe("TestUser");

        expect(setChatVisibility).toHaveBeenCalledWith(true);
        expect(setSocket).toHaveBeenCalled();
    });

    it("Não deve permitir entrar no chat com nome vazio ou espaços", async () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket} />);

        const input = screen.getByPlaceholderText("Nome de usuário");
        const button = screen.getByText("Entrar");

        // Caso 1: Nome vazio
        await act(async () => {
            fireEvent.change(input, { target: { value: "" } });
            fireEvent.click(button);
        });

        // Certifica-se de que `setChatVisibility` e `setSocket` não foram chamados
        expect(setChatVisibility).not.toHaveBeenCalled();
        expect(setSocket).not.toHaveBeenCalled();

        // Caso 2: Nome apenas com espaços
        await act(async () => {
            fireEvent.change(input, { target: { value: "   " } });
            fireEvent.click(button);
        });

        // Ainda não deve permitir entrar no chat
        expect(setChatVisibility).not.toHaveBeenCalled();
        expect(setSocket).not.toHaveBeenCalled();
    });
});