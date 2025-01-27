import axios from "axios";
import "./PokemonList.css";
import { useState } from "react";


import { PokemonModal } from "../pokemonModal/PokemonModal.jsx";
import UsePokemonStore from "../../../store/UsePokemonStore.jsx";   
import { UsePokemons } from "../../../hooks/pokemons/UsePokemons.jsx";


const PokemonList = () => {
    const { loading, error, data: pokemons } = UsePokemons();
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { selectedPokemons, togglePokemon } = UsePokemonStore();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>
                <tbody data-testid="pokemons-list">
                    {pokemons &&
                        pokemons.length > 0 &&
                        pokemons.map((pokemon) => {
                            const id = extractIdFromUrl(pokemon.url);
                            const isSelected = selectedPokemons.some((p) => p.id === id);
                            return (
                                <tr
                                    data-testid={`pokemon-${id}`}
                                    key={pokemon.name}
                                    style={{ cursor: "pointer" }}
                                >
                                    <td>{id}</td>
                                    <td
                                        data-testid={`pokemon-${id}-name`}
                                        onClick={() => fetchPokemonDetails(id)}
                                    >
                                        {pokemon.name}
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                togglePokemon({ id, name: pokemon.name });
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
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
