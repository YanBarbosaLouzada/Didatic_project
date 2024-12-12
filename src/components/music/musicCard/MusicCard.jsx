import React from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import "./MusicCard.css";

function MusicCard({ musica, setEditMode, deleteMusica }) {
    const { nome, genero, cantor, nota, id } = musica

    return (
        <div className="music-card">
            <div className="music-header">
                <h2>{nome}</h2>
                <div className="icons">
                    <AiTwotoneEdit
                        className="icon edit-icon"
                        onClick={() => setEditMode(musica)}
                    />
                    <AiFillDelete
                        className="icon delete-icon"
                        onClick={() => deleteMusica(id)}
                    />
                </div>
            </div>
            <div className="music-details">
                <p><strong>Gênero:</strong> {genero}</p>
                <p><strong>Cantor:</strong> {cantor}</p>
                <p><strong>Nota:</strong> {nota}</p>
            </div>
        </div>
    );
}

export default MusicCard;
