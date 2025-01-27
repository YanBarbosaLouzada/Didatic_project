import { faker } from "@faker-js/faker";

// Função para gerar habilidades (abilities) de Pokémon
const pokemonAbilities = () => {
    return {
        ability: {
            name: faker.word.sample(), // Nome aleatório da habilidade
            url: faker.internet.url(), // URL aleatória para a habilidade
        },
        is_hidden: faker.datatype.boolean(), // Indica se a habilidade é oculta
        slot: 1, // Posição da habilidade no Pokémon
    };
};

// Função para gerar tipos (types) de Pokémon
const pokemonTypes = () => {
    return {
        slot: faker.number.int(), // Posição do tipo no Pokémon
        type: {
            name: faker.word.sample(), // Nome aleatório do tipo
            url: faker.internet.url(), // URL aleatória para o tipo
        },
    };
};

// Fábrica para criar Pokémons fictícios com dados variados
export const pokemonFactory = () => {
    return {
        base_experience: faker.number.int({ min: 50, max: 200 }), // Experiência base aleatória
        id: faker.number.int({ min: 100, max: 1000 }), // ID único para o Pokémon
        name: faker.word.sample(), // Nome aleatório do Pokémon
        abilities: faker.helpers.multiple(pokemonAbilities, { count: 2 }), // Lista de 2 habilidades geradas
        sprites: {
            front_default: faker.internet.url(), // URL da sprite frontal
        },
        types: faker.helpers.multiple(pokemonTypes, { count: 2 }), // Lista de 2 tipos gerados
        weight: faker.number.int({ min: 1, max: 1000 }), // Peso aleatório do Pokémon
    };
};
