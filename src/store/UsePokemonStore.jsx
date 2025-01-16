import { create } from "zustand";

const usePokemonStore = create((set) => ({
    selectedPokemons: [],
    togglePokemon: (pokemon) =>
        set((state) => {
            const isSelected = state.selectedPokemons.some(
                (p) => p.id === pokemon.id
                
            )
            
            return {
                selectedPokemons: isSelected
                    ? state.selectedPokemons.filter((p) => p.id !== pokemon.id)
                    : [...state.selectedPokemons, pokemon],
                
            };
        }),
}));

export default usePokemonStore;