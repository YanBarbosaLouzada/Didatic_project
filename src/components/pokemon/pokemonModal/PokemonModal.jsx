import React from "react";
import './PokemonModal.css';
import { AiFillCloseCircle } from "react-icons/ai";

export const PokemonModal = ({ pokemon, onClose }) => {
    if (!pokemon) {
        return null;
    }

    return (
        <div className="modal-background" data-testid="modal-pokemon">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 data-testid={`pokemon-chosed-${pokemon.id}`} >{pokemon.name}</h2>
                    <button className="close-button" onClick={onClose} data-testid="button-close-modal">
                        <AiFillCloseCircle size={32} color="none" />
                    </button>
                </div>
                <div className="modal-body">
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="pokemon-image"
                    />
                    <div className="pokemon-details">
                        <p><b>Altura:</b> {pokemon.height}</p>
                        <p><b>Peso:</b> {pokemon.weight}</p>
                        <p><b>Habilidades:</b></p>
                        <ul className="abilities-list">
                            {pokemon.abilities.map((ability) => (
                                <li key={ability.ability.name}>{ability.ability.name}</li>
                            ))}
                        </ul>
                        <p><b>Tipos:</b></p>
                        <ul className="types-list">
                            {pokemon.types.map((type) => (
                                <li key={type.type.name}>{type.type.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
