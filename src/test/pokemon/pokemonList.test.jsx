import { React, act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { debug } from "jest-preview";

import PokemonList from "../../components/pokemon/pokemonList/PokemonList.jsx";
import { pokemonsListMock } from "../../mock/pokemon.mock.js";
import { pokemonsListMockFactory } from "../../mock/fatctories/pokemonsMock.factory.js";
import { pokemonFactory } from "../../mock/fatctories/pokemon.factory.js";

// Constante para simular um ID de Pokémon escolhido
const pokemonIdChoosed = 1;

// Mock do axios para interceptar chamadas HTTP
jest.mock("axios");

// Criação de um Pokémon fictício usando faker
const pokemonGenerated = pokemonFactory();

// Gerando lista de Pokémons fictícios
const pokemonsToSee = pokemonsListMockFactory([
    {
        name: pokemonGenerated.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonGenerated.id}/`,
    },
]);

// Configurando o servidor de mock com MSW
const server = setupServer(
    // Mock para listar Pokémons
    rest.get("http://localhost:4444/pokemons", (req, res, ctx) => { return res(ctx.json(pokemonsListMock)) }),
    // Mock para detalhes de um Pokémon específico
    rest.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdChoosed}`, (req, res, ctx) => {
            const { id } = req.params;
            const pokemon = { ...pokemonGenerated, id: parseInt(id) };
            return res(ctx.json(pokemon));
        }
    )
);

// Configuração inicial e limpeza do servidor
beforeAll(() => server.listen()); // Inicia o servidor antes de todos os testes

afterEach(() => {
    server.resetHandlers(); // Reseta handlers para evitar conflitos entre testes
    jest.clearAllMocks(); // Limpa mocks para garantir isolamento dos testes
});

afterAll(() => server.close()); // Fecha o servidor após todos os testes

// Teste para verificar se a lista de Pokémons é renderizada corretamente
test("Checando se a lista de Pokémons está correta", async () => {
    // Mockando a requisição do axios para retornar a lista fictícia
    axios.get.mockResolvedValueOnce({ data: pokemonsToSee });

    // Renderizando o componente de lista de Pokémons
    render(<PokemonList />);

    // Verificando se o texto "Loading..." aparece enquanto a lista é carregada
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    debug();

    // Esperando até que o primeiro Pokémon seja renderizado
    await waitFor(() => {expect(screen.getByTestId(`pokemon-${pokemonGenerated.id}`)).toBeInTheDocument()});

    // Verificando se o texto "Loading..." desapareceu
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();

    // Validando se o número correto de Pokémons foi renderizado
    const pokemonList = await screen.getByTestId("pokemons-list");
    expect(pokemonList.children).toHaveLength(pokemonsToSee.results.length);

    debug();
});

// Teste para verificar a abertura de um modal ao clicar em um Pokémon
test("Abre modal com detalhes do Pokémon ao clicar", async () => {
    // Mockando a resposta inicial da lista de Pokémons
    axios.get.mockResolvedValueOnce({ data: pokemonsToSee });

    // Renderizando o componente de lista de Pokémons
    render(<PokemonList />);

    // Garantindo que o texto "Loading..." aparece inicialmente
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Aguardando até que a lista de Pokémons seja carregada
    await waitFor(() => {expect(screen.getByTestId(`pokemon-${pokemonGenerated.id}`)).toBeInTheDocument();});

    // Mockando a resposta para os detalhes de um Pokémon específico ao clicar
    axios.get.mockResolvedValueOnce({ data: pokemonGenerated });

    // Obtendo o elemento do Pokémon e simulando um clique para abrir o modal
    const pokemonElement = screen.getByTestId(`pokemon-${pokemonGenerated.id}-name`);
    await act(async () => {fireEvent.click(pokemonElement);});

    // Aguardando até que o modal seja exibido
    await waitFor(() => {expect(screen.getByTestId("modal-pokemon")).toBeInTheDocument();});

    // Validando que o modal contém as informações corretas
    expect(screen.getByTestId(`pokemon-chosed-${pokemonGenerated.id}`)).toBeInTheDocument();
    expect(screen.getByText(pokemonGenerated.types[0].type.name)).toBeInTheDocument();
    expect(screen.getByText(pokemonGenerated.types[1].type.name)).toBeInTheDocument();

    // Simulando o clique para fechar o modal
    await act(async () => {fireEvent.click(screen.getByTestId("button-close-modal"));});

    // Verificando se o modal foi fechado corretamente
    await waitFor(() => {expect(screen.queryByTestId("modal-pokemon")).not.toBeInTheDocument();});
});
