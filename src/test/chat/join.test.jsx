import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom/extend-expect";
import Join from "../../components/join/Join.jsx";

describe("Join Component", () => {
    it("should set the username and switch to chat", async () => {
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn();

        // Envolvemos a renderização em act
        await act(async () => {
            render(
                <Join setChatVisibility={setChatVisibility} setSocket={setSocket} />
            );
        });

        const input = screen.getByPlaceholderText("Nome de usuário");

        // Envolvemos as interações em act
        await act(async () => {
            fireEvent.change(input, { target: { value: "TestUser" } });
        });

        const button = screen.getByText("Entrar");

        await act(async () => {
            fireEvent.click(button);
        });

        // Verificações
        expect(setChatVisibility).toHaveBeenCalledWith(true);
        expect(setSocket).toHaveBeenCalled();
    });
});
