import React from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import "./MusicCard.css";

function MusicCard({ musica, setEditMode, deleteMusica }) {
    const { nome, genero, cantor, nota, id } = musica

    return (
        <div className="music-card">
            <h2>{nome}</h2>
            <div> <b>Gênero :</b> {genero}</div>
            <div> <b>Cantor :</b> {cantor} </div>
            <div> <b>Nota:</b> {nota}</div>
            <div className="icons">
                <AiTwotoneEdit
                    color="yellow"
                    size={32}
                    onClick={() => setEditMode(musica)}
                />
                <AiFillDelete
                    color="red"
                    size={32}
                    onClick={() => deleteMusica(id)}
                />
            </div>
        </div>
    );
}

export default MusicCard;
