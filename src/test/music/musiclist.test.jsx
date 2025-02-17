import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { musicFactory } from "../../mock/fatctories/music.factory.js";
import MusicList from "../../components/music/musicList/MusicList";

describe("MusicList Component", () => {
    it("should render list of music and handle edit and delete actions", () => {
        // Mock de músicas (criando manualmente)
        const musicas = Array.from({ length: 3 }, () => musicFactory());
        const setEditMode = jest.fn(); // Mock da função de editar
        const deleteMusica = jest.fn(); // Mock da função de deletar

        render(
            <MusicList
                musicas={musicas}
                setEditMode={setEditMode}
                deleteMusica={deleteMusica}
            />
        );

        // Verifica se o container principal existe
        const musicList = screen.getByTestId("music-list");
        expect(musicList).toBeInTheDocument();
        expect(Array.from(musicList.children)).toHaveLength(musicas.length);

        // Verifica cada música individualmente
        musicas.forEach((musica) => {
            const nomeElement = screen.getByTestId(`music-nome-${musica.id}`);
            expect(nomeElement).toHaveTextContent(musica.nome);

            const cantorElement = screen.getByTestId(`music-cantor-${musica.id}`);
            expect(cantorElement).toHaveTextContent(`Cantor: ${musica.cantor}`);

            const notaElement = screen.getByTestId(`music-nota-${musica.id}`);
            expect(notaElement).toHaveTextContent(`Nota: ${musica.nota}`);

            const generoElement = screen.getByTestId(`music-genero-${musica.id}`);
            expect(generoElement).toHaveTextContent(`Gênero: ${musica.genero}`);

            // Verifica se o ícone de edição e de deletar estão presentes
            const editIcon = screen.getByTestId(`edit-icon-${musica.id}`);
            expect(editIcon).toBeInTheDocument();

            const deleteIcon = screen.getByTestId(`delete-icon-${musica.id}`);
            expect(deleteIcon).toBeInTheDocument();

            // Simula o clique no botão de edição e verifica se a função foi chamada corretamente
            fireEvent.click(editIcon);
            expect(setEditMode).toHaveBeenCalledWith(musica);

            // Simula o clique no botão de deletar e verifica se a função foi chamada corretamente
            fireEvent.click(deleteIcon);
            expect(deleteMusica).toHaveBeenCalledWith(musica.id);
        });
    });
});
