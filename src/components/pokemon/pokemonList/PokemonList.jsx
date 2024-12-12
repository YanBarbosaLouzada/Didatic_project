import axios from 'axios';
import { UsePokemons } from '../../../hooks/pokemons/UsePokemons';
import { useState } from 'react';

const PokemonList = () => {

    // chamando propiedades necessarias para o component com "useContext"
    const { loading, error, data: pokemons } = UsePokemons();
    //Criando um estado para armazenar o pokemon selecionado
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    //Criando um estado para saber se o modal esta aberto ou fechado
    const [modalVisible, setModalVisible] = useState(false);

    // função que verifica se esta carregando a pagina
    if (loading) {
        return <div>Loading...</div>;
    }
    // função que verifica se houve algum erro ao carregar a api
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // função que renderiza a lista de pokemons e extrai o id
    const extractIdFromUrl = (url) => {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }
    // função que renderiza os dados do pokemon selecionado
    const fetchPokemonDetails = async (id) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            setSelectedPokemon(response.data)
            setModalVisible(true)
        } catch (error) {
            console.error("Erro ao buscar detalhes do Pokémon:", error);
        }

    }

    return (
        <div>
            <table>

                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Nome</th>
                    </tr>
                </thead>

                <tbody>
                    {pokemons.map((pokemon) => (
                        <tr
                            key={pokemon.name}
                            onClick={() => fetchPokemonDetails(extractIdFromUrl(pokemon.url))}
                            style={{cursor: 'pointer'}}
                        >
                            <td> {extractIdFromUrl(pokemon.url)} </td>
                            <td> {pokemon.name} </td>

                        </tr>
                    ))}
                </tbody>

            </table>

            {modalVisible && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setModalVisible(false)}
                />
            )}

        </div>
    )
}

export default PokemonList;