import { faker } from "@faker-js/faker";

// Fábrica para criar uma lista de Pokémons fictícios
export const pokemonsListMockFactory = (pokemonsToMock) => {
    return {
        count: faker.number.int(), // Número total de Pokémons na lista
        next: "https://pokeapi.co/api/v2/pokemon?offset=100&limit=100", // URL da próxima página de Pokémons
        previous: null, // URL da página anterior (aqui sempre null para simplificação)
        results: [
            ...pokemonsToMock, // Adiciona Pokémons recebidos como parâmetro
            {
                name: "bulbasaur", // Pokémon fixo para consistência
                url: "https://pokeapi.co/api/v2/pokemon/1/", // URL fixa para o Pokémon
            },
            {
                name: "ivysaur",
                url: "https://pokeapi.co/api/v2/pokemon/2/",
            },
            {
                name: "venusaur",
                url: "https://pokeapi.co/api/v2/pokemon/3/",
            },
            {
                name: "charmander",
                url: "https://pokeapi.co/api/v2/pokemon/4/",
            },
            {
                name: "charmeleon",
                url: "https://pokeapi.co/api/v2/pokemon/5/",
            },
            {
                name: "charizard",
                url: "https://pokeapi.co/api/v2/pokemon/6/",
            },
            {
                name: "squirtle",
                url: "https://pokeapi.co/api/v2/pokemon/7/",
            },
        ],
    };
};
