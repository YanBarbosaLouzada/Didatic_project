import axios from "axios";

export const DeleteMusic = async (id) => {
    const { data } = await axios.delete(`http://localhost:4444/musicas/delete/${id}`);
    return data;
}