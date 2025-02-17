import  React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


import io from "socket.io-client";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Server } from "socket.io";
import { createServer } from "http";

import Chat from "../../components/chat/Chat.jsx";


global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));

const mock = new MockAdapter(axios.default);

// Mock the scrollIntoView function
Element.prototype.scrollIntoView = jest.fn();

jest.setTimeout(10000); // 10 segundos

describe("Chat Component", () => {
    let ioServer, socket;

    beforeAll((done) => {
        const httpServer = createServer();
        ioServer = new Server(httpServer);

        httpServer.listen(() => {
            const { port } = httpServer.address();
            socket = io(`http://localhost:${port}`);
            done();
        });
    });

    afterAll((done) => {
        if (socket) {
            socket.close();
        }
        if (ioServer) {
            ioServer.close();
        }
        jest.clearAllTimers(); // Garante que timers não fiquem abertos
        done();
    });

    it("should handle axios and socket.io communication", async () => {
        mock.onGet("/api/some-endpoint").reply(200, { data: "some data" });

        render(<Chat socket={socket} />);

        fireEvent.change(screen.getByPlaceholderText("Mensagem"), {
            target: { value: "Hello, World!" },
        });
        fireEvent.click(screen.getByText("Enviar Mensagem"));
    });
});

