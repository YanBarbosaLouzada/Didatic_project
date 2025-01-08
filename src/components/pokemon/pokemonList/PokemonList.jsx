import axios from "axios";
import { UsePokemons } from "../../../hooks/pokemons/UsePokemons.jsx";
import { useState } from "react";
import { PokemonModal } from "../pokemonModal/PokemonModal.jsx";
import "./PokemonList.css";

const PokemonList = () => {
    const { loading, error, data: pokemons } = UsePokemons();
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error-message">Erro: {error}</div>;

    const extractIdFromUrl = (url) => {
        const urlParts = url.split("/");
        return urlParts[urlParts.length - 2];
    };

    const fetchPokemonDetails = async (id) => {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${id}/`
            );
            setSelectedPokemon(response.data);
            setModalVisible(true);
        } catch (error) {
            console.error("Failed to fetch Pokémon details:", error);
        }
    };

    return (
        <div className="pokemon-list-container">
            <h1>Lista de Pokémons</h1>
            <table className="pokemon-table">
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
                        >
                            <td>{extractIdFromUrl(pokemon.url)}</td>
                            <td className="pokemon-name">{pokemon.name}</td>
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
    );
};

export default PokemonList;
