import axios from "axios";

export const GetMusic = async () => {
    const { data } = await axios.get("http://localhost:4444/musicas/");
    return data;
}