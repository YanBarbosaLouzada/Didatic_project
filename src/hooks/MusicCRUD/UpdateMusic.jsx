import axios from "axios";

export const UpdateMusic = async ({ nome, cantor, genero, nota, id }) => {
    const { data } = await axios.put(`http://localhost:4444/musicas/edit/${id}`, {
        nome,
        cantor,
        genero,
        nota,
        id
    });
    return data;
};