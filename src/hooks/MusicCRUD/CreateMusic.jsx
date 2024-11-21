import axios from "axios";


export const CreateMusic = async ({ nome, genero, cantor, nota }) => {
    const { data } = await axios.post("http://localhost:4444/musicas/create", {
        nome,
        genero,
        cantor,
        nota
    });

    return data;
};