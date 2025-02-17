import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Join from "../../components/join/Join.jsx";

describe("Join Component", () => {
    it("Deve permitir escrever o nome e entrar no chat", () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket} />);

        const input = screen.getByPlaceholderText("Nome de usuário");
        fireEvent.change(input, { target: { value: "TestUser" } });

        const button = screen.getByText("Entrar");
        fireEvent.click(button);

        expect(input.value).toBe("TestUser");
        expect(setChatVisibility).toHaveBeenCalledWith(true);
        expect(setSocket).toHaveBeenCalled();
    });

    it("Não deve permitir entrar no chat com nome vazio ou apenas espaços", () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket} />);

        const input = screen.getByPlaceholderText("Nome de usuário");
        const button = screen.getByText("Entrar");

        // Caso 1: Nome vazio
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.click(button);

        expect(setChatVisibility).not.toHaveBeenCalled();
        expect(setSocket).not.toHaveBeenCalled();

        // Caso 2: Nome apenas com espaços
        fireEvent.change(input, { target: { value: "   " } });
        fireEvent.click(button);

        expect(setChatVisibility).not.toHaveBeenCalled();
        expect(setSocket).not.toHaveBeenCalled();
    });
});
