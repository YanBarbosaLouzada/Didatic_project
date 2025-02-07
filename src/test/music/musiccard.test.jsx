import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MusicCard from "../../components/music/musicCard/MusicCard.jsx";
import { musicFactory } from "../../mock/fatctories/music.factory.js"

// Criando um mock de música usando o factory
const musica = musicFactory();

describe("MusicCard Componente", () => {
    it("deve renderizar os detalhes da música e lidar com as ações de editar e deletar", () => {
        // Mocks para as funções de editar e deletar
        const setEditMode = jest.fn();
        const deleteMusica = jest.fn();

        // Renderizando o componente
        render(
            <MusicCard
                musica={musica}
                setEditMode={setEditMode}
                deleteMusica={deleteMusica}
            />
        );

        const nomeElement = screen.getByTestId(`music-nome-${musica.id}`);
        expect(nomeElement).toHaveTextContent(musica.nome)

        const cantorElement = screen.getByTestId(`music-cantor-${musica.id}`);
        expect(cantorElement).toHaveTextContent(`Cantor: ${musica.cantor}`);

        const notaElement = screen.getByTestId(`music-nota-${musica.id}`);
        expect(notaElement).toHaveTextContent(`Nota: ${musica.nota}`);

        const generoElement = screen.getByTestId(`music-genero-${musica.id}`);
        expect(generoElement).toHaveTextContent(`Gênero: ${musica.genero}`);

        // Simula o clique no botão de edição e verifica se a função foi chamada corretamente
        const editIcon = screen.getByTestId(`edit-icon-${musica.id}`);
        fireEvent.click(editIcon);
        expect(setEditMode).toHaveBeenCalledWith(musica);

        // Simula o clique no botão de deletar e verifica se a função foi chamada corretamente
        const deleteIcon = screen.getByTestId(`delete-icon-${musica.id}`);
        fireEvent.click(deleteIcon);
        expect(deleteMusica).toHaveBeenCalledWith(musica.id);
    });
});
